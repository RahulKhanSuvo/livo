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
      <div className="mx-auto max-w-md space-y-5 rounded-sm bg-card p-8 text-center shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/[0.06]">
        <div className="mx-auto flex size-16 items-center justify-center rounded-sm bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={36} />
        </div>

        <div className="space-y-1.5">
          <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
            Payment Successful
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Thank you for your order. Your payment was confirmed and is now being processed.
          </p>
        </div>

        <div className="border-t border-border/70 pt-5 text-xs text-muted-foreground">
          A confirmation email is on its way with your order details.
        </div>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:justify-center">
          <Button asChild variant="outline" size="lg" className="rounded-sm">
            <Link href="/profile/orders">View my orders</Link>
          </Button>
          <Button asChild variant="default" size="lg" className="rounded-sm">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
