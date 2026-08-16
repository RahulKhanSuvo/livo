'use server';

import prisma from '@/lib/prisma';

export async function getAllProducts(page: number = 1, limit: number = 10) {
  try {
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        take: limit,
        skip,
        include: {
          variants: {
            include: {
              images: true,
            },
          },
          material: {
            select: {
              id: true,
              name: true,
            },
          },
          brand: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.product.count(),
    ]);

    const result = {
      products,
      total,
      page,
      limit,
      hasNextPage: skip + products.length < total,
      hasPrevPage: page > 1,
    };
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error('Error in getAllProducts:', error);
    throw error;
  }
}
