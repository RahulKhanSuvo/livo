'use client';

import { CartItem } from '@/stores/cart-store';
import { CartItemCard } from './cart-item-card';

interface CartItemsListProps {
  items: CartItem[];
}

export function CartItemsList({ items }: CartItemsListProps) {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex-1 space-y-3 border p-2">
      {/* Header Container */}
      <div className=" bg-[#f6f6f6] px-4 py-4">
        <h2 className="text-base font-normal text-neutral-800">
          You have ({totalQuantity}) {totalQuantity === 1 ? 'item' : 'items'} in your cart
        </h2>
      </div>

      {/* Items Container */}
      <div className="rounded-b-md bg-white px-3">
        {items.map((item) => (
          <CartItemCard key={`${item.productId}-${item.variantId}`} item={item} />
        ))}
      </div>
    </div>
  );
}
