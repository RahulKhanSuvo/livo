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
        },
      }),
      prisma.product.count(),
    ]);

    return {
      products,
      total,
      page,
      limit,
      hasNextPage: skip + products.length < total,
      hasPrevPage: page > 1,
    };
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}
