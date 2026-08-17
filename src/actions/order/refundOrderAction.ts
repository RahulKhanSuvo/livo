'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { z } from 'zod';

export const refundOrderAction = createSafeAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }) => {
    const order = await prisma.order.findUnique({ where: { id } });

    if (!order) {
      throw new Error('Order not found');
    }

    if (order.paymentStatus !== 'PAID') {
      return { refunded: false, message: 'Order is not paid, nothing to refund.' };
    }

    if (order.stripePaymentIntentId) {
      await stripe.refunds.create({ payment_intent: order.stripePaymentIntentId });
    }

    await prisma.order.update({
      where: { id },
      data: { paymentStatus: 'REFUNDED' },
    });

    return { refunded: true, message: 'Refund processed successfully.' };
  }
);
