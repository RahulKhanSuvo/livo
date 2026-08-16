'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getAllBrandAction = createSafeAction(
  null,
  async () => {
    return prisma.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  },
  { successMessage: 'Brands fetched successfully' }
);
