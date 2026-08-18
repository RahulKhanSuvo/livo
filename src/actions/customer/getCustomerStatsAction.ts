'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

const ACTIVE_DAYS = 90;

export const getCustomerStatsAction = createSafeAction(null, async () => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const activeSince = new Date(now.getTime() - ACTIVE_DAYS * 24 * 60 * 60 * 1000);

  const [total, newThisMonth, active, repeatGroups] = await Promise.all([
    prisma.user.count({ where: { role: 'USER' } }),
    prisma.user.count({ where: { role: 'USER', createdAt: { gte: monthStart } } }),
    prisma.user.count({
      where: {
        role: 'USER',
        orders: { some: { createdAt: { gte: activeSince } } },
      },
    }),
    prisma.order.groupBy({
      by: ['userId'],
      where: { status: 'DELIVERED', user: { role: 'USER' } },
      _count: { _all: true },
      having: { userId: { _count: { gt: 1 } } },
    }),
  ]);

  return {
    total,
    newThisMonth,
    active,
    repeat: repeatGroups.length,
  };
});
