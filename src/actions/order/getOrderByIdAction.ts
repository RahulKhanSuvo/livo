'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { OrderStatus, PaymentStatus } from '@/generated/prisma/client';

export type OrderDetailItem = {
  id: string;
  productName: string;
  variantName: string | null;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderDetail = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  fullName: string;
  phone: string;
  email: string | null;
  country: string;
  division: string;
  district: string;
  area: string;
  postalCode: string | null;
  address: string;
  notes: string | null;
  items: OrderDetailItem[];
};

export const getOrderByIdAction = createSafeAction(
  z.object({ id: z.string().min(1) }),
  async ({ id }) => {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            productVariant: {
              include: { images: true },
            },
          },
        },
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const detail: OrderDetail = {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      subtotal: Number(order.subtotal),
      shippingFee: Number(order.shippingFee),
      discount: Number(order.discount),
      total: Number(order.total),
      fullName: order.fullName,
      phone: order.phone,
      email: order.email,
      country: order.country,
      division: order.division,
      district: order.district,
      area: order.area,
      postalCode: order.postalCode,
      address: order.address,
      notes: order.notes,
      items: order.items.map((i) => ({
        id: i.id,
        productName: i.productName,
        variantName: i.variantName,
        imageUrl: i.imageUrl || i.productVariant?.images?.[0]?.imageUrl || null,
        quantity: i.quantity,
        unitPrice: Number(i.unitPrice),
        totalPrice: Number(i.totalPrice),
      })),
    };

    return detail;
  }
);
