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
