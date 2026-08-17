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

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
        },
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

      break;
    }
  }

  return NextResponse.json({
    received: true,
  });
}
