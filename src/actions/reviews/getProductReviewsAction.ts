'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { z } from 'zod';

const schema = z.object({ productId: z.string().min(1) });

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string | null;
  comment: string;
  date: string;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export const getProductReviewsAction = createSafeAction(schema, async ({ productId }) => {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user?.id;

  const [reviews, aggregate] = await Promise.all([
    prisma.review.findMany({
      where: { productId },
      select: {
        id: true,
        rating: true,
        title: true,
        comment: true,
        createdAt: true,
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.review.aggregate({
      _avg: { rating: true },
      _count: { _all: true },
      where: { productId },
    }),
  ]);

  const mapped: ProductReview[] = reviews.map((r) => ({
    id: r.id,
    author: r.user?.name ?? 'Anonymous',
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    date: formatDate(r.createdAt),
  }));

  let canReview = false;
  let orderItemId: string | null = null;
  let existingReview: ProductReview | null = null;

  if (userId) {
    const deliveredItem = await prisma.orderItem.findFirst({
      where: { productId, order: { userId, status: 'DELIVERED' } },
      select: { id: true },
    });

    if (deliveredItem) {
      canReview = true;
      orderItemId = deliveredItem.id;
      const existing = await prisma.review.findUnique({
        where: { userId_orderItemId: { userId, orderItemId: deliveredItem.id } },
        select: { id: true, rating: true, title: true, comment: true, createdAt: true },
      });
      existingReview = existing
        ? {
            id: existing.id,
            author: session?.user?.name ?? 'You',
            rating: existing.rating,
            title: existing.title,
            comment: existing.comment,
            date: formatDate(existing.createdAt),
          }
        : null;
    }
  }

  return {
    reviews: mapped,
    averageRating: aggregate._avg.rating ?? 0,
    total: aggregate._count._all,
    canReview,
    orderItemId,
    existingReview,
  };
});
