import { z } from 'zod';

export const furnitureQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
  status: z.enum(['ACTIVE', 'DEACTIVATED']).optional(),
  category: z.string().trim().optional(),
  subcategory: z.string().trim().optional(),
  type: z.string().trim().optional(),
  subtype: z.string().trim().optional(),
  brand: z.string().trim().optional(),
  material: z.string().trim().optional(),
  productType: z.string().trim().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  inStock: z.string().trim().optional(),
  sortBy: z.enum(['createdAt', 'price', 'soldCount']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type FurnitureQuery = z.infer<typeof furnitureQuerySchema>;
export const adminValidationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(8),
  search: z.string().trim().optional(),
  status: z.enum(['ACTIVE', 'DEACTIVATED']).optional(),
  sort: z.enum(['newest', 'oldest', 'price_desc', 'price_asc']).default('newest'),
});
export type AdminValidationType = z.infer<typeof adminValidationSchema>;
