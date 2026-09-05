'use server';

import { Prisma } from '@/generated/prisma/client';
import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { QueryBuilder } from '@/lib/query-builder';
import { adminValidationSchema, AdminValidationType } from './furniture.validation';

export type AdminFurniture = Prisma.ProductGetPayload<{
  include: {
    variants: {
      include: {
        images: true;
      };
    };
    brand: true;
  };
}>;

export const getAdminAllFurniture = createSafeAction(
  adminValidationSchema,
  async (input: AdminValidationType) => {
    const { page, limit, search, status, sort = 'newest' } = input;

    const sortFieldMap: Record<string, { field: string; order: 'asc' | 'desc' }> = {
      newest: { field: 'createdAt', order: 'desc' },
      oldest: { field: 'createdAt', order: 'asc' },
      price_desc: { field: 'price', order: 'desc' },
      price_asc: { field: 'price', order: 'asc' },
    };

    const currentSort = sortFieldMap[sort] ?? sortFieldMap.newest;

    const query = new QueryBuilder<Prisma.ProductFindManyArgs>()
      .search(['name', 'description'], search)
      .filter('status', status)
      .sort(currentSort.field, currentSort.order)
      .paginate(page, limit)
      .include('variants', {
        include: {
          images: true,
        },
      })
      .include('brand')
      .build();

    const [furniture, total] = await Promise.all([
      prisma.product.findMany(query),

      prisma.product.count({
        where: query.where,
      }),
    ]);

    const totalPages = Math.ceil(total / input.limit);

    return {
      data: furniture,

      pagination: {
        page: input.page,
        limit: input.limit,
        total,
        totalPages,
        hasNextPage: input.page < totalPages,
        hasPreviousPage: input.page > 1,
      },
    };
  }
);
