'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export interface UserReview {
  id: string;
  productId: string;
  productName: string;
  rating: number;
  title: string | null;
  comment: string;
  date: string;
}

export const getUserReviewsAction = createSafeAction(null, async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { reviews: [] as UserReview[] };

  const reviews = await prisma.review.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      productId: true,
      rating: true,
      title: true,
      comment: true,
      createdAt: true,
      product: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return {
    reviews: reviews.map((r) => ({
      id: r.id,
      productId: r.productId,
      productName: r.product.name,
      rating: r.rating,
      title: r.title,
      comment: r.comment,
      date: r.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    })),
  };
});
