'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { furnitureQuerySchema } from './furniture.validation';

export const getAllFurnitureAction = createSafeAction(
  furnitureQuerySchema,
  async ({ page, limit, search, sortBy, sortOrder }) => {
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              description: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
            {
              slug: {
                contains: search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        take: limit,
        skip,
        where,
        orderBy: {
          [sortBy]: sortOrder,
        },
        include: {
          variants: {
            include: {
              images: true,
            },
          },
        },
      }),

      prisma.product.count({
        where,
      }),
    ]);

    return {
      products,
      total,
      page,
      limit,
      hasNextPage: skip + products.length < total,
      hasPrevPage: page > 1,
    };
  }
);
