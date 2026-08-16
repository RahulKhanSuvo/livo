'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const createBrandAction = createSafeAction(
  z.object({
    name: z.string().min(1, 'Brand name is required'),
  }),
  async ({ name }) => {
    const brand = await prisma.brand.create({
      data: {
        id: name,
        name: name,
      },
    });
    return brand;
  }
);
