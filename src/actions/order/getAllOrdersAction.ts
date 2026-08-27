'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { orderQuerySchema } from './order.validation';

import { QueryBuilder } from '@/lib/query-builder';
import type { Prisma, OrderStatus, PaymentStatus } from '@/generated/prisma/client';

export type OrderItemRow = {
  id: string;
  productName: string;
  variantName: string | null;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderRow = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  createdAt: string;
  date: string;
  customer: string;
  itemCount: number;
  items: OrderItemRow[];
};

export const getAllOrdersAction = createSafeAction(orderQuerySchema, async (input) => {
  const { page, limit, status, search } = input;

  const query = new QueryBuilder<Prisma.OrderFindManyArgs>()
    .filter('status', status)
    // .filter('paymentStatus', 'PAID')
    .search(['orderNumber'], search)
    .sort('createdAt', 'desc')
    .include('user', { select: { name: true, email: true, id: true } })
    .include('items', {
      include: {
        productVariant: {
          include: {
            images: { take: 1 },
          },
        },
      },
    })
    .paginate(page, limit)
    .build();

  const orders = await prisma.order.findMany(query);
  console.log(JSON.stringify(orders, null, 2));

  const result: OrderRow[] = orders.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status,
    paymentStatus: order.paymentStatus,
    total: order.total.toNumber(),
    createdAt: order.createdAt.toISOString(),
    date: order.createdAt.toISOString(),
    customer: order.user?.name ?? order.fullName ?? 'Guest',
    itemCount: order.items.reduce((sum: number, item) => sum + item.quantity, 0),
    items: order.items.map((item) => ({
      id: item.id,
      productName: item.productName,
      variantName: item.variantName,
      imageUrl: item.productVariant?.images?.[0]?.imageUrl ?? item.imageUrl ?? null,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
    })),
  }));

  return result;
});
