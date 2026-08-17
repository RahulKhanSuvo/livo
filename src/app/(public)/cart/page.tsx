'use client';
import { useCartStore } from '@/stores/cart-store';
import { CartBreadcrumb } from '@/components/cart/cart-breadcrumb';
import { CartItemsList } from '@/components/cart/cart-items-list';
import { CartOrderSummary } from '@/components/cart/cart-order-summary';
import { EmptyCart } from '@/components/cart/empty-cart';
import { Container } from '@/components/shared/Container';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  const isEmpty = items.length === 0;

  return (
    <Container>
      <CartBreadcrumb />

      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Items List (Left Column) */}
          <CartItemsList items={items} />

          {/* Order Summary (Right Column) */}
          <CartOrderSummary items={items} />
        </div>
      )}
    </Container>
  );
}
