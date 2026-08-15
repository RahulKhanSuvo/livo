'use server';

import prisma from '@/lib/prisma';

export async function getAllFurniture(
  page: number = 1,
  limit: number = 10,
  category?: string,
  search: string = '',
  subCategory?: string,
  type?: string,
  sortBy?: 'asc' | 'desc',
  sortOrder?: 'createdAt' | 'price'
) {
  try {
    const skip = (page - 1) * limit;

    // Build where clause dynamically
    const where: {
      category?: string;
      subCategory?: string;
      type?: string;
      OR?: {
        name?: { contains: string; mode: 'insensitive' };
        description?: { contains: string; mode: 'insensitive' };
        slug?: { contains: string; mode: 'insensitive' };
      }[];
    } = {};

    if (category) {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (subCategory) {
      where.subCategory = subCategory;
    }

    if (type) {
      where.type = type;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        take: limit,
        skip,
        where,
        orderBy: sortOrder
          ? {
              [sortOrder]: sortBy,
            }
          : undefined,
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
