import { z } from 'zod';

export const existingImageSchema = z.object({
  id: z.string(),
  variantId: z.string(),
  imageUrl: z.url(),
  alt: z.string().nullable().optional(),
  sortOrder: z.number(),
  createdAt: z.coerce.date(),
});

export const galleryImageSchema = z.union([existingImageSchema, z.instanceof(File)]);

export const productValidationSchema = z.object({
  id: z.string().optional(),

  productTypeId: z.string().min(1, 'Product type is required'),

  name: z.string().min(2, 'Name must be at least 2 characters').max(100),

  slug: z.string().min(2, 'Slug is required'),

  brand: z.string().min(1, 'Brand is required'),

  description: z.string().min(1, 'Description is required').max(1000),

  material: z.string().min(1, 'Material is required'),

  finish: z.string().min(1, 'Finish is required'),

  width: z.coerce.number().min(0, 'Width must be a positive number'),

  height: z.coerce.number().min(0, 'Height must be a positive number'),

  depth: z.coerce.number().min(0, 'Depth must be a positive number'),

  weightKg: z.coerce.number().min(0, 'Weight must be a positive number'),

  assemblyRequired: z.boolean(),

  variants: z
    .array(
      z.object({
        id: z.string().optional(),

        colorHex: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Invalid HEX color'),

        sku: z.string().min(1, 'SKU is required').max(50),

        price: z.coerce.number().positive('Price is required'),

        salePrice: z.coerce.number().min(0, 'Sale price cannot be negative'),

        stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),

        images: z.array(galleryImageSchema).min(1, 'At least one gallery image is required'),
      })
    )
    .min(1, 'At least one variant is required'),
});

export type ProductValidationType = z.infer<typeof productValidationSchema>;
