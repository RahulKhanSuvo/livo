'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { deleteCouponSchema } from './coupon.validation';

export const deleteCouponAction = createSafeAction(deleteCouponSchema, async ({ id }) => {
  await prisma.coupon.delete({ where: { id } });

  revalidatePath('/admin/promotions/coupons');

  return { success: true };
});
