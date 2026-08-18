import { z } from 'zod';

export const transactionQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional().default(''),
});

export type TransactionRow = {
  id: string;
  order: string;
  customer: string;
  method: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
};
