import { z } from 'zod';

export const productValidationSchema = z.object({
  productTypeId: z.string().min(1, 'Product type is required'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  slug: z.string().min(2, 'Slug is required'),
  brand: z.string().optional().or(z.literal('')),
  description: z.string().max(1000).optional().or(z.literal('')),
  material: z.string().optional().or(z.literal('')),
  finish: z.string().optional().or(z.literal('')),
  width: z.coerce.number().min(0, 'Width must be a positive number'),
  height: z.coerce.number().min(0, 'Height must be a positive number'),
  depth: z.coerce.number().min(0, 'Depth must be a positive number'),
  weightKg: z.coerce.number().min(0, 'Weight must be a positive number'),
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

        mainImage: z.any().refine((val) => !!val, 'Main image is required'),
        hoverImage: z.any().optional(),
        gallery: z.array(z.any()).min(1, 'At least one gallery image is required'),
      })
    )
    .min(1, 'At least one variant is required'),
});

export type ProductValidationType = z.infer<typeof productValidationSchema>;
