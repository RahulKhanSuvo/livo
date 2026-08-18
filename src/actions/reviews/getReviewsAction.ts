'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export interface AdminReviewRow {
  id: string;
  product: string;
  author: string;
  rating: number;
  title: string | null;
  comment: string;
  date: string;
}

const schema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional().default(''),
});

export const getReviewsAction = createSafeAction(schema, async ({ page, limit, search }) => {
  const where = search
    ? {
        OR: [
          { comment: { contains: search, mode: 'insensitive' as const } },
          { title: { contains: search, mode: 'insensitive' as const } },
          { product: { name: { contains: search, mode: 'insensitive' as const } } },
          { user: { name: { contains: search, mode: 'insensitive' as const } } },
        ],
      }
    : {};

  const [total, reviews] = await Promise.all([
    prisma.review.count({ where }),
    prisma.review.findMany({
      where,
      select: {
        id: true,
        rating: true,
        title: true,
        comment: true,
        createdAt: true,
        product: { select: { name: true } },
        user: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
  ]);

  const mapped: AdminReviewRow[] = reviews.map((r) => ({
    id: r.id,
    product: r.product.name,
    author: r.user?.name ?? 'Anonymous',
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    date: r.createdAt.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
  }));

  return { reviews: mapped, total };
});
