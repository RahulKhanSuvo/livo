'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

const LOW_STOCK_THRESHOLD = 5;

export const getProductStatsAction = createSafeAction(null, async () => {
  const [total, active, outOfStock, lowStock] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { status: 'ACTIVE' } }),
    prisma.product.count({
      where: { variants: { every: { stock: { lte: 0 } } } },
    }),
    prisma.product.count({
      where: { variants: { some: { stock: { gt: 0, lte: LOW_STOCK_THRESHOLD } } } },
    }),
  ]);

  return { total, active, outOfStock, lowStock };
});
