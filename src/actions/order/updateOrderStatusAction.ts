'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { OrderStatus } from '@/generated/prisma/client';

const FULFILMENT_STATUSES: OrderStatus[] = ['PROCESSING', 'SHIPPED', 'DELIVERED'];

export const updateOrderStatusAction = createSafeAction(
  z.object({
    id: z.string().min(1),
    status: z.nativeEnum(OrderStatus),
  }),
  async ({ id, status }) => {
    const order = await prisma.order.findUnique({
      where: { id },
      select: { id: true, status: true, paymentStatus: true },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    if (FULFILMENT_STATUSES.includes(status) && order.paymentStatus !== 'PAID') {
      throw new Error('Payment must be confirmed before an order can be processed or delivered.');
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return { id: updated.id, status: updated.status };
  }
);
