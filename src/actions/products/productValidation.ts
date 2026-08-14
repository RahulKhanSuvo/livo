import { z } from 'zod';

export const productValidationSchema = z.object({
  productTypeId: z.string().min(1, 'Product type is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z
    .string()
    .min(2, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Must be a valid slug (e.g. leather-sofa)'),
  brand: z.string().optional().or(z.literal('')),
  description: z.string().max(1000).optional().or(z.literal('')),
  material: z.string().optional().or(z.literal('')),
  finish: z.string().optional().or(z.literal('')),

  width: z.number().positive('Must be greater than 0').optional(),
  height: z.number().positive('Must be greater than 0').optional(),
  depth: z.number().positive('Must be greater than 0').optional(),
  weightKg: z.number().positive('Must be greater than 0').optional(),

  assemblyRequired: z.boolean(),

  variants: z
    .array(
      z.object({
        colorHex: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, 'Invalid HEX color (e.g. #000000)')
          .optional()
          .or(z.literal('')),
        sku: z.string().min(1, 'SKU is required').max(50),

        // Use z.coerce.number() directly so input/output match TanStack Form's expected type
        price: z.number().positive('Price is required'),
        salePrice: z.number().optional(),
        stock: z.number().int().min(0, 'Stock cannot be negative'),

        mainImage: z.string().url('Invalid main image URL'),
        hoverImage: z.string().url('Invalid hover image URL').optional().or(z.literal('')),
        gallery: z
          .array(z.string().url('Invalid URL'))
          .min(1, 'At least one gallery image is required'),
      })
    )
    .min(1, 'At least one variant is required'),
});

export type ProductValidationType = z.infer<typeof productValidationSchema>;
