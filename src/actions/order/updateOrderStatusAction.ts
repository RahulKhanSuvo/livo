'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { OrderStatus } from '@/generated/prisma/client';

export const updateOrderStatusAction = createSafeAction(
  z.object({
    id: z.string().min(1),
    status: z.nativeEnum(OrderStatus),
  }),
  async ({ id, status }) => {
    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return { id: order.id, status: order.status };
  }
);
