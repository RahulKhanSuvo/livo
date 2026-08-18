'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getCouponStatsAction = createSafeAction(null, async () => {
  const now = new Date();

  const [total, active, expired] = await Promise.all([
    prisma.coupon.count(),
    prisma.coupon.count({
      where: {
        active: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
      },
    }),
    prisma.coupon.count({ where: { expiresAt: { lt: now } } }),
  ]);

  return { total, active, expired };
});
