'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';

export const cancelOrderAction = createSafeAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }) => {
    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new Error('Order not found');
    }

    let refunded = false;

    if (order.paymentStatus === 'PAID' && order.stripePaymentIntentId) {
      await stripe.refunds.create({ payment_intent: order.stripePaymentIntentId });
      refunded = true;
    }

    await prisma.order.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        paymentStatus: refunded ? 'REFUNDED' : order.paymentStatus,
      },
    });

    return { cancelled: true, refunded };
  }
);
