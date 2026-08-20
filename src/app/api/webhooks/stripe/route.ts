import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing stripe signature', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (error) {
    console.error('Stripe webhook signature failed:', error);

    return new NextResponse('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error('Missing orderId in Stripe metadata');
        break;
      }

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.findUnique({
          where: { id: orderId },
          include: { items: true },
        });

        if (!order) {
          throw new Error('Order not found');
        }

        // Prevent processing the same webhook twice
        if (order.paymentStatus === 'PAID') {
          return;
        }

        for (const item of order.items) {
          const result = await tx.productVariant.updateMany({
            where: {
              id: item.productVariantId,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });

          if (result.count === 0) {
            throw new Error(`Insufficient stock for variant ${item.productVariantId}`);
          }
        }

        await tx.order.update({
          where: {
            id: order.id,
          },
          data: {
            paymentStatus: 'PAID',
            status: 'CONFIRMED',
          },
        });

        const soldByProduct = new Map<string, number>();

        for (const item of order.items) {
          soldByProduct.set(
            item.productId,
            (soldByProduct.get(item.productId) ?? 0) + item.quantity
          );
        }

        await Promise.all(
          Array.from(soldByProduct.entries()).map(([productId, qty]) =>
            tx.product.update({
              where: { id: productId },
              data: { soldCount: { increment: qty } },
            })
          )
        );

        await tx.payment.updateMany({
          where: { reference: paymentIntent.id },
          data: { status: 'PAID' },
        });
      });

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error('Missing orderId in Stripe metadata');
        break;
      }

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentStatus: 'FAILED',
        },
      });

      await prisma.payment.updateMany({
        where: { reference: paymentIntent.id },
        data: { status: 'FAILED' },
      });

      break;
    }
  }

  return NextResponse.json({
    received: true,
  });
}
