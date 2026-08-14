'use server';

import prisma from '@/lib/prisma';
import { productValidationSchema, ProductValidationType } from './productValidation';

export async function createProduct(data: ProductValidationType) {
  const validated = productValidationSchema.parse(data);

  return await prisma.product.create({
    data: {
      productTypeId: validated.productTypeId,
      name: validated.name,
      slug: validated.slug,
      description: validated.description || null,
      brand: validated.brand || null,
      material: validated.material || null,
      finish: validated.finish || null,
      width: validated.width ?? null,
      height: validated.height ?? null,
      depth: validated.depth ?? null,
      weightKg: validated.weightKg ?? null,
      assemblyRequired: validated.assemblyRequired,

      variants: {
        create: validated.variants.map((v) => {
          const imagesPayload = [
            { imageUrl: v.mainImage, type: 'MAIN' as const, sortOrder: 0 },
            ...(v.hoverImage
              ? [{ imageUrl: v.hoverImage, type: 'HOVER' as const, sortOrder: 1 }]
              : []),
            ...v.gallery.map((url, idx) => ({
              imageUrl: url,
              type: 'GALLERY' as const,
              sortOrder: idx + 2,
            })),
          ];

          return {
            colorHex: v.colorHex || null,
            sku: v.sku,
            price: v.price,
            salePrice: v.salePrice ?? null,
            stock: v.stock,
            images: {
              create: imagesPayload,
            },
          };
        }),
      },
    },
    include: {
      variants: {
        include: {
          images: true,
        },
      },
    },
  });
}
