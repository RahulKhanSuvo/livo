'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

export type ProductActionResult =
  { success: true; message: string; productId: string } | { success: false; error: string };

const variantSchema = z.object({
  color: z.string().trim().max(60).optional(),
  sku: z
    .string()
    .trim()
    .min(2, 'SKU must be at least 2 characters')
    .max(40)
    .regex(/^[A-Z0-9-]+$/, 'SKU must be uppercase letters, numbers and dashes'),
  price: z.coerce.number().positive('Price must be greater than 0'),
  salePrice: z.coerce.number().positive('Sale price must be greater than 0').optional(),
  stock: z.coerce.number().int().nonnegative('Stock cannot be negative'),
});

const productSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  brand: z.string().trim().max(80).optional(),
  material: z.string().trim().max(80).optional(),
  description: z.string().trim().max(500).optional(),
  category: z.string().trim().min(1, 'Select or create a category'),
  subcategory: z.string().trim().min(1, 'Select or create a subcategory'),
  productType: z.string().trim().min(1, 'Select or create a product type'),
  variants: z.array(variantSchema).min(1, 'Add at least one variant'),
});

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createProductAction(
  values: z.input<typeof productSchema>
): Promise<ProductActionResult> {
  const parsed = productSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  const data = parsed.data;

  try {
    const skus = data.variants.map((v) => v.sku);
    const existingSku = await prisma.productVariant.findFirst({
      where: { sku: { in: skus } },
      select: { sku: true },
    });
    if (existingSku) {
      return { success: false, error: `A variant with SKU ${existingSku.sku} already exists` };
    }

    const category = await prisma.category.upsert({
      where: { slug: slugify(data.category) },
      update: { name: data.category },
      create: { name: data.category, slug: slugify(data.category) },
    });

    const subcategory = await prisma.subCategory.upsert({
      where: { slug: slugify(data.subcategory) },
      update: { name: data.subcategory, categoryId: category.id },
      create: {
        name: data.subcategory,
        slug: slugify(data.subcategory),
        categoryId: category.id,
      },
    });

    const productType = await prisma.productType.upsert({
      where: { slug: slugify(data.productType) },
      update: { name: data.productType, subCategoryId: subcategory.id },
      create: {
        name: data.productType,
        slug: slugify(data.productType),
        subCategoryId: subcategory.id,
      },
    });

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: slugify(data.name),
        description: data.description || null,
        brand: data.brand || null,
        material: data.material || null,
        productTypeId: productType.id,
        variants: {
          create: data.variants.map((v) => ({
            color: v.color || null,
            sku: v.sku,
            price: v.price,
            salePrice: v.salePrice ?? null,
            stock: v.stock,
          })),
        },
      },
      select: { id: true },
    });

    return { success: true, message: 'Product created', productId: product.id };
  } catch {
    return { success: false, error: 'Could not create the product' };
  }
}
