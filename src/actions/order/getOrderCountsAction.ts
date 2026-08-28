'use server';

import prisma from '@/lib/prisma';
import { OrderStatus } from '@/generated/prisma/client';

export type OrderCounts = {
  all: number;
  processing: number;
  shipped: number;
  canceled: number;
};

export async function getOrderCountsAction(): Promise<OrderCounts> {
  const [allCount, countsByStatus] = await Promise.all([
    prisma.order.count(),
    prisma.order.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    }),
  ]);

  const countMap: Partial<Record<OrderStatus, number>> = {};
  countsByStatus.forEach((group) => {
    countMap[group.status] = group._count._all;
  });

  return {
    all: allCount,
    processing: countMap[OrderStatus.PROCESSING] ?? 0,
    shipped: countMap[OrderStatus.SHIPPED] ?? 0,
    canceled: countMap[OrderStatus.CANCELLED] ?? 0,
  };
}
