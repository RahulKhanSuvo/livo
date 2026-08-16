'use client';
import { ShoppingCart02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AccountMenu } from './account-menu';
import CartSheet from '../cart/CartSheet';
import { useState } from 'react';
import { useCartStore } from '@/stores/cart-store';

export const RightActions = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <AccountMenu />
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label="Cart"
        className="flex items-center relative gap-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
      >
        <HugeiconsIcon icon={ShoppingCart02Icon} size={19} strokeWidth={1.5} />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 text-xs font-semibold rounded-full bg-red-500 text-white h-4 w-4 flex items-center justify-center">
            {items?.length}
          </span>
        )}
      </button>
      <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
export default RightActions;
