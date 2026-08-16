'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getAllBrandAction = createSafeAction(
  null,
  async () => {
    try {
      return await prisma.brand.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      console.error('Error in getAllBrandAction:', error);
      throw error;
    }
  },
  { successMessage: 'Brands fetched successfully' }
);
