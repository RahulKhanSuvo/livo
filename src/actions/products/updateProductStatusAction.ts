'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { ProductStatus } from '@/generated/prisma/client';
import { revalidatePath } from 'next/cache';

export const updateProductStatusAction = createSafeAction(
  z.object({
    id: z.string().min(1),
    status: z.nativeEnum(ProductStatus),
  }),
  async ({ id, status }) => {
    const product = await prisma.product.update({
      where: { id },
      data: { status },
    });

    revalidatePath('/admin/catalog/products');

    return { id: product.id, status: product.status };
  }
);
