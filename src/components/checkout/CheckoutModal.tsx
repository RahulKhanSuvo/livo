'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  CheckmarkCircle02Icon,
  CreditCardIcon,
  ShoppingCart02Icon,
} from '@hugeicons/core-free-icons';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';
import { authClient } from '@/lib/auth-client';
import { ShippingStep } from './ShippingStep';
import { PaymentStep } from './PaymentStep';
import { formatMoney } from '@/components/admin/ui/format';
import type { CheckoutModalProps, CheckoutStep, ShippingFormData } from './checkout-types';

export function CheckoutModal({
  open,
  onOpenChange,
  items,
  subtotal,
  shippingFee,
  discountAmount,
  totalAmount,
  couponCode,
}: CheckoutModalProps) {
  const clearCart = useCartStore((state) => state.clearCart);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

  const resetState = useCallback(() => {
    setCurrentStep('shipping');
    setClientSecret(null);
    setOrderId(null);
    setShippingData(null);
  }, []);

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      if (currentStep === 'success') {
        clearCart();
      }
      // Reset to step 1 when modal closes
      resetState();
    }
    onOpenChange(isOpen);
  };

  const handleShippingComplete = (data: {
    clientSecret: string;
    orderId: string;
    shippingData: ShippingFormData;
  }) => {
    setClientSecret(data.clientSecret);
    setOrderId(data.orderId);
    setShippingData(data.shippingData);
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    setCurrentStep('success');
    clearCart();
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
  };

  // Dynamic header content based on step
  const headerTitle =
    currentStep === 'success'
      ? 'Payment Successful'
      : currentStep === 'payment'
        ? 'Complete Payment'
        : 'Checkout';

  const headerDescription =
    currentStep === 'success'
      ? 'Your order has been placed successfully!'
      : currentStep === 'payment'
        ? 'Enter your card details to finalize your order'
        : 'Enter your shipping details to continue';

  const headerIcon =
    currentStep === 'success'
      ? CheckmarkCircle02Icon
      : currentStep === 'payment'
        ? CreditCardIcon
        : ShoppingCart02Icon;

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-w-xl overflow-hidden p-0 gap-0 border-border bg-card rounded">
        {/* Header */}
        <div className="border-b border-border bg-muted/30 px-6 py-5">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl font-semibold text-foreground font-heading flex items-center gap-2">
                  <HugeiconsIcon icon={headerIcon} size={22} className="text-primary" />
                  {headerTitle}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground mt-0.5">
                  {headerDescription}
                </DialogDescription>
              </div>

              {/* <div className="text-right">
                <span className="text-xs text-muted-foreground block">
                  Amount Due
                </span>
                <span className="text-base font-bold text-primary">
                  {formatMoney(totalAmount)}
                </span>
              </div> */}
            </div>
          </DialogHeader>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {currentStep === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={36} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">Thank you for your order!</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Your payment was confirmed. We are preparing your shipment now.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-3">
                <Button asChild variant="outline" className="h-10 text-xs">
                  <Link href="/profile/orders">View My Orders</Link>
                </Button>
                <Button
                  variant="default"
                  className="h-10 text-xs"
                  onClick={() => {
                    clearCart();
                    handleModalClose(false);
                  }}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : currentStep === 'payment' && clientSecret && orderId && shippingData ? (
            <PaymentStep
              clientSecret={clientSecret}
              shippingData={shippingData}
              items={items}
              totalAmount={totalAmount}
              onBack={handleBackToShipping}
              onSuccess={handlePaymentSuccess}
            />
          ) : (
            <ShippingStep
              items={items}
              totalAmount={totalAmount}
              subtotal={subtotal}
              shippingFee={shippingFee}
              discountAmount={discountAmount}
              couponCode={couponCode}
              defaultValues={{
                fullName: user?.name ?? '',
                email: user?.email ?? '',
              }}
              onComplete={handleShippingComplete}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
