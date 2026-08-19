import { z } from 'zod';

export const orderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.string().trim().optional(),
  search: z.string().trim().optional(),
});

export type OrderQuery = z.infer<typeof orderQuerySchema>;
