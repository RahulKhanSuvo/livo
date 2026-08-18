import { z } from 'zod';

export const customerQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().trim().default(''),
});

export type CustomerSegment = 'VIP' | 'Regular' | 'New';

export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  segment: CustomerSegment;
  orders: number;
  spent: number;
  joined: string;
  lastOrder: string;
}
