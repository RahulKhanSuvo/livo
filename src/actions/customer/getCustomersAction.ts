'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { customerQuerySchema, type CustomerRow } from './customer.validation';

const DAY_MS = 24 * 60 * 60 * 1000;

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getSegment(orders: number, spent: number, joined: Date): CustomerRow['segment'] {
  const thirtyDaysAgo = new Date(Date.now() - 30 * DAY_MS);
  if (joined >= thirtyDaysAgo) return 'New';
  if (orders >= 5 || spent >= 5000) return 'VIP';
  return 'Regular';
}

export const getCustomersAction = createSafeAction(
  customerQuerySchema,
  async ({ page, limit, search }) => {
    const where = {
      role: 'USER' as const,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          orders: {
            select: { total: true, status: true, createdAt: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const customers: CustomerRow[] = users.map((u) => {
      const orderCount = u.orders.length;
      const spent = u.orders.reduce((sum, o) => sum + Number(o.total), 0);
      const lastOrderDate = u.orders.reduce<Date | null>(
        (latest, o) => (latest === null || o.createdAt > latest ? o.createdAt : latest),
        null
      );

      return {
        id: u.id,
        name: u.name,
        email: u.email,
        segment: getSegment(orderCount, spent, u.createdAt),
        orders: orderCount,
        spent,
        joined: formatDate(u.createdAt),
        lastOrder: lastOrderDate ? formatDate(lastOrderDate) : '—',
      };
    });

    return { customers, total };
  }
);
