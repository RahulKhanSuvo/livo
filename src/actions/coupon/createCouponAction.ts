'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { createCouponSchema } from './coupon.validation';

export const createCouponAction = createSafeAction(createCouponSchema, async (data) => {
  const coupon = await prisma.coupon.create({
    data: {
      code: data.code.toUpperCase(),
      type: data.type,
      value: data.value,
      minOrder: data.minOrder ?? null,
      maxUses: data.maxUses ?? null,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      active: data.active ?? true,
    },
  });

  revalidatePath('/admin/promotions/coupons');

  return { id: coupon.id };
});
