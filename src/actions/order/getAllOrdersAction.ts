'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { orderQuerySchema } from './order.validation';
import { OrderStatus, PaymentStatus } from '@/generated/prisma/client';
import { QueryBuilder } from '@/lib/query-builder';
import type { Prisma } from '@/generated/prisma/client';
export type OrderRow = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  firstItem: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  date: string;
};

export const getAllOrdersAction = createSafeAction(orderQuerySchema, async (input) => {
  const { page, limit, status, search } = input;
  const query = new QueryBuilder<
    Prisma.OrderWhereInput,
    Prisma.OrderOrderByWithRelationInput,
    Prisma.OrderInclude
  >()
    .filter('status', status)
    .search(['orderNumber'], search)
    .sort('createdAt', 'desc')
    .include('user')
    .include('items')
    .paginate(page, limit)
    .build();

  const orders = await prisma.order.findMany(query);
  return orders;
});
