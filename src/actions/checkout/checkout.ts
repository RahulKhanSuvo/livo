'use server';

import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

interface CheckoutItem {
  productId: string;
  variantId: string;
  quantity: number;
}

interface ShippingData {
  fullName: string;
  phone: string;
  email?: string;
  country: string;
  division: string;
  district: string;
  area: string;
  postalCode?: string;
  address: string;
  notes?: string;
}

interface CheckoutData {
  items: CheckoutItem[];
  shipping: ShippingData;
}

export async function createPaymentIntent(data: CheckoutData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return {
      success: false,
      error: 'You must be logged in',
    };
  }

  if (!data.items.length) {
    return {
      success: false,
      error: 'Your cart is empty',
    };
  }

  const variantIds = data.items.map((item) => item.variantId);

  const variants = await prisma.productVariant.findMany({
    where: {
      id: {
        in: variantIds,
      },
    },
    include: {
      product: true,
    },
  });

  if (variants.length !== data.items.length) {
    return {
      success: false,
      error: 'One or more products are unavailable',
    };
  }

  let subtotal = 0;

  const orderItems = [];

  for (const item of data.items) {
    const variant = variants.find((v) => v.id === item.variantId);

    if (!variant) {
      return {
        success: false,
        error: 'Variant not found',
      };
    }

    if ((variant.stock ?? 0) < item.quantity) {
      return {
        success: false,
        error: `${variant.product.name} is out of stock`,
      };
    }

    const price =
      variant.product.salePrice != null && Number(variant.product.salePrice) > 0
        ? Number(variant.product.salePrice)
        : Number(variant.product.price);

    const totalPrice = price * item.quantity;

    subtotal += totalPrice;

    orderItems.push({
      productId: variant.product.id,
      productVariantId: variant.id,
      quantity: item.quantity,
      unitPrice: price,
      totalPrice,
      productName: variant.product.name,
      variantName: null,
      imageUrl: null,
    });
  }

  const shippingFee = subtotal >= 100 ? 0 : 10;

  const discount = 0;

  const total = subtotal + shippingFee - discount;

  const amount = Math.round(total * 100);

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,

      orderNumber: `ORD-${Date.now()}`,

      status: 'PENDING',
      paymentStatus: 'PENDING',

      subtotal,
      shippingFee,
      discount,
      total,

      fullName: data.shipping.fullName,
      phone: data.shipping.phone,
      email: data.shipping.email,

      country: data.shipping.country,
      division: data.shipping.division,
      district: data.shipping.district,
      area: data.shipping.area,
      postalCode: data.shipping.postalCode,
      address: data.shipping.address,
      notes: data.shipping.notes,

      items: {
        create: orderItems,
      },
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    payment_method_types: ['card'],
    metadata: {
      orderId: order.id,
      orderNumber: order.orderNumber,
    },
  });

  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      stripePaymentIntentId: paymentIntent.id,
    },
  });

  return {
    success: true,
    clientSecret: paymentIntent.client_secret,
    orderId: order.id,
  };
}
