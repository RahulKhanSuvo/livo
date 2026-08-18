'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { updateCouponSchema } from './coupon.validation';

export const updateCouponAction = createSafeAction(updateCouponSchema, async (data) => {
  const { id, ...rest } = data;

  const updateData: Record<string, unknown> = {};
  if (rest.code !== undefined) updateData.code = rest.code.toUpperCase();
  if (rest.type !== undefined) updateData.type = rest.type;
  if (rest.value !== undefined) updateData.value = rest.value;
  if (rest.minOrder !== undefined) updateData.minOrder = rest.minOrder ?? null;
  if (rest.maxUses !== undefined) updateData.maxUses = rest.maxUses ?? null;
  if (rest.expiresAt !== undefined) {
    updateData.expiresAt = rest.expiresAt ? new Date(rest.expiresAt) : null;
  }
  if (rest.active !== undefined) updateData.active = rest.active;

  const coupon = await prisma.coupon.update({
    where: { id },
    data: updateData,
  });

  revalidatePath('/admin/promotions/coupons');

  return { id: coupon.id };
});
