'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';

export const getAllMaterialAction = createSafeAction(
  null,
  async () =>
    prisma.material.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
  { successMessage: 'Materials fetched successfully' }
);
