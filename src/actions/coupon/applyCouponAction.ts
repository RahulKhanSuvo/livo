'use server';

import { createSafeAction } from '@/lib/createSafeAction';
import { z } from 'zod';
import { evaluateCoupon } from './coupon-utils';

const applyCouponSchema = z.object({
  code: z.string().trim().min(1),
  subtotal: z.coerce.number().min(0),
});

export const applyCouponAction = createSafeAction(applyCouponSchema, async ({ code, subtotal }) => {
  return evaluateCoupon(code, subtotal);
});
