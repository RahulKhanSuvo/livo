'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { orderQuerySchema } from './order.validation';
import { Prisma, OrderStatus, PaymentStatus } from '@/generated/prisma/client';

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

export const getAllOrdersAction = createSafeAction(
  orderQuerySchema,
  async ({ page, limit, status }) => {
    const skip = (page - 1) * limit;

    let statusFilter: OrderStatus | undefined;
    if (status && status !== 'ALL') {
      const candidate = status as OrderStatus;
      if (Object.values(OrderStatus).includes(candidate)) {
        statusFilter = candidate;
      }
    }

    const where: Prisma.OrderWhereInput = statusFilter ? { status: statusFilter } : {};

    const [orders, total, statusGroups, revenueAgg, awaitingPayment, toFulfil] = await Promise.all([
      prisma.order.findMany({
        take: limit,
        skip,
        where,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      }),
      prisma.order.count({ where }),
      prisma.order.groupBy({
        by: ['status'],
        _count: { _all: true },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'PAID' },
      }),
      prisma.order.count({
        where: { paymentStatus: 'PENDING', status: { not: 'CANCELLED' } },
      }),
      prisma.order.count({
        where: { status: { in: ['CONFIRMED', 'PROCESSING', 'SHIPPED'] } },
      }),
    ]);

    const rows: OrderRow[] = orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customer: o.fullName,
      email: o.email ?? '',
      firstItem: o.items[0]?.productName ?? '',
      itemCount: o.items.length,
      total: Number(o.total),
      status: o.status,
      paymentStatus: o.paymentStatus,
      date: o.createdAt.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    }));

    const statusCounts: Record<string, number> = { ALL: total };
    for (const group of statusGroups) {
      statusCounts[group.status] = group._count._all;
    }

    return {
      orders: rows,
      total,
      page,
      limit,
      hasNextPage: skip + orders.length < total,
      hasPrevPage: page > 1,
      statusCounts,
      stats: {
        revenue: Number(revenueAgg._sum.total ?? 0),
        awaitingPayment,
        toFulfil,
      },
    };
  }
);
