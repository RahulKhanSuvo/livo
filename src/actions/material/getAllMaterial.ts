'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getAllMaterialAction = createSafeAction(
  null,
  async () => {
    try {
      return await prisma.material.findMany({
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      console.error('Error in getAllMaterialAction:', error);
      throw error;
    }
  },
  { successMessage: 'Materials fetched successfully' }
);
