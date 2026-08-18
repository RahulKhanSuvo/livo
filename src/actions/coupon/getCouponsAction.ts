'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { couponQuerySchema, type CouponRow } from './coupon.validation';

export const getCouponsAction = createSafeAction(
  couponQuerySchema,
  async ({ page, limit, search }) => {
    const where = search ? { code: { contains: search, mode: 'insensitive' as const } } : {};

    const [total, coupons] = await Promise.all([
      prisma.coupon.count({ where }),
      prisma.coupon.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    const rows: CouponRow[] = coupons.map((c) => ({
      id: c.id,
      code: c.code,
      type: c.type,
      value: Number(c.value),
      minOrder: c.minOrder != null ? Number(c.minOrder) : null,
      maxUses: c.maxUses,
      usedCount: c.usedCount,
      expiresAt: c.expiresAt ? c.expiresAt.toISOString() : null,
      active: c.active,
      createdAt: c.createdAt.toISOString(),
    }));

    return { coupons: rows, total };
  }
);
