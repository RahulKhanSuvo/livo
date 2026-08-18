import prisma from '@/lib/prisma';
import { CouponType } from '@/generated/prisma/client';

export interface CouponEvaluation {
  ok: boolean;
  message: string;
  discount: number;
  coupon?: { id: string; code: string };
}

export async function evaluateCoupon(rawCode: string, subtotal: number): Promise<CouponEvaluation> {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: false, message: 'Enter a coupon code.', discount: 0 };

  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon) return { ok: false, message: 'Invalid coupon code.', discount: 0 };
  if (!coupon.active) return { ok: false, message: 'This coupon is not active.', discount: 0 };

  const now = new Date();
  if (coupon.expiresAt && coupon.expiresAt < now) {
    return { ok: false, message: 'This coupon has expired.', discount: 0 };
  }
  if (coupon.maxUses != null && coupon.usedCount >= coupon.maxUses) {
    return { ok: false, message: 'This coupon has reached its usage limit.', discount: 0 };
  }
  if (coupon.minOrder != null && subtotal < Number(coupon.minOrder)) {
    return {
      ok: false,
      message: `Minimum order of ${Number(coupon.minOrder)} required for this coupon.`,
      discount: 0,
    };
  }

  const raw =
    coupon.type === CouponType.PERCENTAGE
      ? subtotal * (Number(coupon.value) / 100)
      : Number(coupon.value);

  const discount = Math.min(raw, subtotal);
  const rounded = Math.round(discount * 100) / 100;

  return {
    ok: true,
    message: 'Coupon applied.',
    discount: rounded,
    coupon: { id: coupon.id, code: coupon.code },
  };
}
