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
  brandId: z.string().min(1, 'Brand is required'),
  price: z.number({ error: 'Price is required' }).positive('Price must be greater than 0'),
  salePrice: z
    .number({ error: 'Sale price must be a number' })
    .min(0, 'Sale price cannot be negative')
    .optional(),
  description: z.string().min(1, 'Description is required').max(1000),
  materialId: z.string().min(1, 'Material is required'),
  width: z
    .number({ error: 'Width must be a number' })
    .min(0, 'Width must be a positive number')
    .optional(),
  height: z
    .number({ error: 'Height must be a number' })
    .min(0, 'Height must be a positive number')
    .optional(),
  depth: z
    .number({ error: 'Depth must be a number' })
    .min(0, 'Depth must be a positive number')
    .optional(),
  weightKg: z
    .number({ error: 'Weight must be a number' })
    .min(0, 'Weight must be a positive number')
    .optional(),
  assemblyRequired: z.boolean(),
  variants: z
    .array(
      z.object({
        id: z.string().optional(),
        colorHex: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Invalid HEX color')
          .nullable()
          .optional(),
        stock: z
          .number({ error: 'Stock is required' })
          .int('Stock must be a whole number')
          .min(0, 'Stock cannot be negative'),
        images: z.array(galleryImageSchema).min(1, 'At least one gallery image is required'),
      })
    )
    .min(1, 'At least one variant is required'),
});

export type ProductValidationType = z.infer<typeof productValidationSchema>;
