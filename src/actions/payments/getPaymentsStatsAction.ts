'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getPaymentsStatsAction = createSafeAction(null, async () => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [paidThisMonth, payoutPending, statusGroups] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID', createdAt: { gte: monthStart } },
    }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'PAID', order: { status: { not: 'DELIVERED' } } },
    }),
    prisma.payment.groupBy({
      by: ['status'],
      _count: { _all: true },
    }),
  ]);

  const counts = Object.fromEntries(statusGroups.map((g) => [g.status, g._count._all]));
  const paid = counts['PAID'] ?? 0;
  const failed = counts['FAILED'] ?? 0;
  const refunded = counts['REFUNDED'] ?? 0;

  const successRate = paid + failed > 0 ? (paid / (paid + failed)) * 100 : 100;
  const refundPercent = paid + refunded > 0 ? (refunded / (paid + refunded)) * 100 : 0;

  return {
    processedThisMonth: Number(paidThisMonth._sum.amount ?? 0),
    pendingPayouts: Number(payoutPending._sum.amount ?? 0),
    successRate: Math.round(successRate * 10) / 10,
    refundsPercent: Math.round(refundPercent * 10) / 10,
  };
});
