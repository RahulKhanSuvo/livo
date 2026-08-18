'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { transactionQuerySchema, type TransactionRow } from './payments.validation';

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const statusMap: Record<string, TransactionRow['status']> = {
  PAID: 'Paid',
  PENDING: 'Pending',
  REFUNDED: 'Refunded',
  FAILED: 'Failed',
};

export const getTransactionsAction = createSafeAction(
  transactionQuerySchema,
  async ({ page, limit, search }) => {
    const where = search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: 'insensitive' as const } },
            { reference: { contains: search, mode: 'insensitive' as const } },
            { order: { user: { name: { contains: search, mode: 'insensitive' as const } } } },
          ],
        }
      : {};

    const [total, payments] = await Promise.all([
      prisma.payment.count({ where }),
      prisma.payment.findMany({
        where,
        select: {
          id: true,
          orderNumber: true,
          amount: true,
          status: true,
          method: true,
          createdAt: true,
          order: {
            select: {
              user: { select: { name: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const transactions: TransactionRow[] = payments.map((p) => ({
      id: p.id,
      order: p.orderNumber,
      customer: p.order?.user?.name ?? 'Guest',
      method: p.method,
      amount: Number(p.amount),
      date: formatDate(p.createdAt),
      status: statusMap[p.status] ?? 'Pending',
    }));

    return { transactions, total };
  }
);
