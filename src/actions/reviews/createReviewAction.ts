'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { z } from 'zod';

const schema = z.object({
  productId: z.string().min(1),
  orderItemId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(120).optional(),
  comment: z.string().min(1, 'Please share a few words about the product.').max(2000),
});

export const createReviewAction = createSafeAction(
  schema,
  async ({ productId, orderItemId, rating, title, comment }) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return { ok: false as const, message: 'You must be signed in to leave a review.' };
    }

    const userId = session.user.id;

    const orderItem = await prisma.orderItem.findFirst({
      where: {
        id: orderItemId,
        productId,
        order: { userId, status: 'DELIVERED' },
      },
      select: { id: true },
    });

    if (!orderItem) {
      return { ok: false as const, message: 'You can only review items you have received.' };
    }

    const existing = await prisma.review.findUnique({
      where: { userId_orderItemId: { userId, orderItemId } },
    });

    if (existing) {
      return { ok: false as const, message: 'You have already reviewed this purchase.' };
    }

    await prisma.review.create({
      data: {
        userId,
        productId,
        orderItemId,
        rating,
        title: title ?? null,
        comment,
      },
    });

    return { ok: true as const, message: 'Thanks! Your review was posted.' };
  }
);
