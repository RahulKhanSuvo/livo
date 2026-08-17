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
import { authClient } from '@/lib/auth-client';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = subtotal >= 10000 || subtotal === 0 ? 0 : 100;
  const total = Math.max(0, subtotal + shippingFee - discountAmount);

  const formattedSubtotal = subtotal.toLocaleString('en-BD', { maximumFractionDigits: 2 });
  const formattedShipping =
    shippingFee === 0 ? 'FREE' : `${shippingFee.toLocaleString('en-BD')} BDT`;
  const formattedTotal = total.toLocaleString('en-BD', { maximumFractionDigits: 2 });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === 'LIVO10') {
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      setAppliedCoupon('LIVO10 (10% OFF)');
    } else {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      alert('Invalid coupon code. Try "LIVO10" for 10% off!');
    }
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
      <div className="w-full shrink-0 space-y-6 lg:w-105">
        <div className="rounded border border-border bg-card p-6 space-y-6">
          <h2 className="text-lg font-semibold text-foreground font-heading border-b border-border pb-3">
            Order Summary
          </h2>

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
              <span className="font-medium text-foreground">{formattedSubtotal} BDT</span>
            </div>

            <div className="flex items-center justify-between text-muted-foreground">
              <span>Delivery Fee</span>
              <span className="font-medium text-foreground">{formattedShipping}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>Coupon Discount</span>
                <span className="font-medium">- {discountAmount.toLocaleString('en-BD')} BDT</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm pt-3 border-t border-dashed border-border font-semibold text-foreground">
              <span>Total Payable</span>
              <span className="text-lg font-bold text-primary">{formattedTotal} BDT</span>
            </div>
          </div>

          {/* Coupon Code Section */}
          <form onSubmit={handleApplyCoupon} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Promo Code (e.g. LIVO10)"
                className="h-10 pl-9 text-xs"
              />
              <HugeiconsIcon
                icon={Ticket01Icon}
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>
            <Button type="submit" variant="secondary" className="h-10 px-4 text-xs font-medium">
              Apply
            </Button>
          </form>

          {appliedCoupon && (
            <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <span>Coupon applied: {appliedCoupon}</span>
              <button
                type="button"
                onClick={() => {
                  setAppliedCoupon(null);
                  setDiscountAmount(0);
                  setCouponCode('');
                }}
                className="text-muted-foreground hover:text-destructive transition-colors ml-2"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </button>
            </div>
          )}

          {/* Checkout Button */}
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

          {/* Continue Shopping */}
          <div className="text-center pt-1">
            <Link
              href="/shop"
              className="text-xs font-semibold text-primary hover:underline transition-all"
            >
              Continue Shopping
            </Link>
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
      />
    </>
  );
}
