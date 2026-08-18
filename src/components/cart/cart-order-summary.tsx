'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingCart02Icon,
  Ticket01Icon,
  Cancel01Icon,
  AlertCircleIcon,
} from '@hugeicons/core-free-icons';

import { CartItem } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatMoney } from '@/components/admin/ui/format';
import { authClient } from '@/lib/auth-client';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { applyCouponAction } from '@/actions/coupon/applyCouponAction';

interface CartOrderSummaryProps {
  items: CartItem[];
}

export function CartOrderSummary({ items }: CartOrderSummaryProps) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 10000 || subtotal === 0 ? 0 : 100;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const formattedSubtotal = formatMoney(subtotal);
  const formattedShipping = shippingFee === 0 ? 'FREE' : formatMoney(shippingFee);
  const formattedTotal = formatMoney(total);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const code = couponCode.trim();
    if (!code) return;

    setIsApplying(true);
    try {
      const res = await applyCouponAction({ code, subtotal });
      if (res.success && res.data?.ok) {
        setDiscountAmount(res.data.discount);
        setAppliedCoupon(code.toUpperCase());
      } else {
        setDiscountAmount(0);
        setAppliedCoupon(null);
        setCouponError(res.data?.message ?? res.message ?? 'This coupon could not be applied.');
      }
    } catch {
      setCouponError('Something went wrong. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setCouponCode('');
    setCouponError(null);
  };

  const handleProceedToCheckout = () => {
    setErrorMsg(null);

    if (!user) {
      setErrorMsg('You must be logged in to checkout. Please sign in first.');
      return;
    }

    if (!items.length) {
      setErrorMsg('Your cart is empty.');
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="w-full shrink-0 space-y-6 lg:w-120 sticky top-24">
        <div className="rounded border border-border  p-2 space-y-6">
          <div className=" bg-[#f6f6f6] px-4 py-4">
            <h2 className="text-base font-normal text-neutral-800">Order Summary</h2>
          </div>
          {/* Error Banner */}
          {errorMsg && (
            <div className="flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
              <HugeiconsIcon icon={AlertCircleIcon} size={18} className="shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMsg}</p>
            </div>
          )}

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Sub Total</span>
              <span className="font-medium text-foreground">{formattedSubtotal}</span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-medium text-foreground">{formattedShipping}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>Coupon Discount</span>
                <span className="font-medium">- {formatMoney(discountAmount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm pt-3 border-t border-dashed border-border font-semibold text-foreground">
              <span>Total Payable</span>
              <span className="text-lg font-bold text-primary">{formattedTotal}</span>
            </div>
          </div>

          {/* Coupon Code Section */}
          {!appliedCoupon && (
            <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter promo code"
                  className="h-10 pl-9 text-xs"
                  disabled={isApplying}
                />
                <HugeiconsIcon
                  icon={Ticket01Icon}
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
              </div>
              <Button
                type="submit"
                variant="secondary"
                className="h-10 px-4 text-xs font-medium"
                disabled={isApplying}
              >
                {isApplying ? 'Applying…' : 'Apply'}
              </Button>
            </form>
          )}

          {couponError && <p className="text-xs text-destructive">{couponError}</p>}

          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span>Coupon applied: {appliedCoupon}</span>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-muted-foreground hover:text-destructive transition-colors ml-2"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </button>
            </div>
          )}

          {/* Checkout Button */}
          <div className="flex gap-2 flex-col items-center w-full pb-5">
            <div>
              <Button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full h-11 text-xs font-semibold gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <HugeiconsIcon icon={ShoppingCart02Icon} size={16} />
              </Button>
            </div>
            {/*or*/}
            <span className="text-xs text-center font-semibold text-primary hover:underline transition-all">
              {' '}
              or{' '}
            </span>
            {/* Continue Shopping */}
            <div className="text-center">
              <Link
                href="/shop"
                className="text-xs font-semibold text-primary hover:underline transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Step Checkout Modal */}
      <CheckoutModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        items={items}
        subtotal={subtotal}
        shippingFee={shippingFee}
        discountAmount={discountAmount}
        totalAmount={total}
        couponCode={appliedCoupon ?? undefined}
      />
    </>
  );
}
