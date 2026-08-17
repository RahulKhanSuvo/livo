'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

import { Container } from '@/components/shared/Container';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cart-store';

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md text-center rounded-2xl border border-border bg-card p-8 shadow-sm space-y-4">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={36} />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground font-heading">Payment Successful!</h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Thank you for your order! Your payment was confirmed and your order is being processed.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
          <Button asChild variant="outline" className="h-10 text-xs">
            <Link href="/profile/orders">View My Orders</Link>
          </Button>
          <Button asChild variant="default" className="h-10 text-xs">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
