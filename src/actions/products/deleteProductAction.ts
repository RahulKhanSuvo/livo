'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

export const deleteProductAction = createSafeAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }) => {
    const [orderItems, cartItems] = await Promise.all([
      prisma.orderItem.count({ where: { productId: id } }),
      prisma.cartItem.count({ where: { productId: id } }),
    ]);

    if (orderItems > 0 || cartItems > 0) {
      throw new Error('Cannot delete this product — it has existing orders or items in carts.');
    }

    await prisma.product.delete({ where: { id } });

    revalidatePath('/admin/catalog/products');

    return { success: true } as const;
  }
);
