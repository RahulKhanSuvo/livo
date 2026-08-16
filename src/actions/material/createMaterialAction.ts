'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';

export const createMaterialAction = createSafeAction(
  z.object({
    name: z.string().min(1, 'Material name is required'),
  }),
  async ({ name }) => {
    const material = await prisma.material.create({
      data: {
        id: name,
        name: name,
      },
    });
    return material;
  }
);
