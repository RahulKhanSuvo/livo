'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { orderQuerySchema } from './order.validation';
import { OrderStatus, PaymentStatus } from '@/generated/prisma/client';
import { QueryBuilder } from '@/lib/query-builder';
import type { Prisma } from '@/generated/prisma/client';

export type OrderItemRow = {
  id: string;
  productId: string;
  productVariantId: string | null;
  productName: string;
  variantName: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl: string | null;
};

export type OrderRow = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  firstItem: string;
  itemCount: number;
  items: OrderItemRow[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
};

export const getAllOrdersAction = createSafeAction(
  orderQuerySchema,
  async (input): Promise<OrderRow[]> => {
    const { page, limit, status, search } = input;

    const query = new QueryBuilder<Prisma.OrderFindManyArgs>()
      .filter('status', status)
      .filter('paymentStatus', 'PAID')
      .search(['orderNumber'], search)
      .sort('createdAt', 'desc')
      .include('user')
      .include('items')
      .paginate(page, limit)
      .build();

    const orders = await prisma.order.findMany(query);

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,

      customer: order.user.name,
      email: order.user.email,

      firstItem: order.items[0]?.productName ?? 'No items',

      itemCount: order.items.length,

      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        productVariantId: item.productVariantId,
        productName: item.productName,
        variantName: item.variantName,
        quantity: item.quantity,
        unitPrice: Number(item.unitPrice),
        totalPrice: Number(item.totalPrice),
        imageUrl: item.imageUrl,
      })),

      total: Number(order.total),

      status: order.status,
      paymentStatus: order.paymentStatus,

      date: order.createdAt.toISOString(),
    }));
  }
);
