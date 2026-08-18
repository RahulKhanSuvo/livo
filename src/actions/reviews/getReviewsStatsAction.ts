'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getReviewsStatsAction = createSafeAction(null, async () => {
  const [total, avgAgg, fiveStar, positive] = await Promise.all([
    prisma.review.count(),
    prisma.review.aggregate({ _avg: { rating: true } }),
    prisma.review.count({ where: { rating: 5 } }),
    prisma.review.count({ where: { rating: { gte: 4 } } }),
  ]);

  const averageRating = avgAgg._avg.rating ?? 0;
  const positiveRate = total > 0 ? (positive / total) * 100 : 0;

  return {
    total,
    averageRating: Math.round(averageRating * 10) / 10,
    fiveStar,
    positiveRate: Math.round(positiveRate * 10) / 10,
  };
});
