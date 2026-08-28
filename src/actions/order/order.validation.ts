import { OrderStatus } from '@/generated/prisma/enums';
import { z } from 'zod';

export const orderQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).default(10).optional(),
  status: z.preprocess(
    (val) => (val === '' || val === 'ALL' ? undefined : val),
    z.nativeEnum(OrderStatus).optional()
  ),
  search: z.string().trim().optional(),
  sort: z.enum(['newest', 'oldest', 'total_desc', 'total_asc']).default('newest').optional(),
});

export type OrderQuery = z.infer<typeof orderQuerySchema>;
