'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, ShoppingBag02Icon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { StripeCheckoutForm } from './StripeCheckoutForm';
import { formatMoney } from '@/components/admin/ui/format';
import type { PaymentStepProps } from './checkout-types';

export function PaymentStep({
  clientSecret,
  shippingData,
  items,
  totalAmount,
  onBack,
  onSuccess,
}: PaymentStepProps) {
  return (
    <div className="space-y-5">
      {/* Step Indicator */}
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
            ✓
          </span>
          <span className="text-muted-foreground">Shipping</span>
        </div>
        <div className="h-px flex-1 bg-primary/40" />
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            2
          </span>
          <span className="font-semibold text-foreground">Payment</span>
        </div>
      </div>

      {/* Shipping Recap */}
      <div className="rounded border border-border bg-muted/40 p-4 text-xs space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <HugeiconsIcon icon={Location01Icon} size={15} className="text-primary" />
            <span>Shipping Address</span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-primary hover:underline text-[11px] font-medium transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="text-foreground font-medium pt-0.5">
          {shippingData.fullName} • {shippingData.phone}
        </p>
        <p className="text-muted-foreground">
          {shippingData.address}, {shippingData.area}, {shippingData.district}
        </p>
      </div>

      {/* Items Count */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-3">
        <span className="flex items-center gap-1">
          <HugeiconsIcon icon={ShoppingBag02Icon} size={15} />
          Order Items ({items.length})
        </span>
        <span className="font-semibold text-foreground">Total: {formatMoney(totalAmount)}</span>
      </div>

      {/* Stripe Payment */}
      <div className="rounded-sm border border-border bg-card p-4 sm:p-5 shadow-xs">
        <StripeCheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
      </div>

      {/* Back Button */}
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        className="h-9 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} size={14} />
        Back to Shipping
      </Button>
    </div>
  );
}
