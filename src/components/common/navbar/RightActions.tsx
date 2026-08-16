'use client';
import { ShoppingBag01Icon } from '@hugeicons/core-free-icons';
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
  console.log('cart', items);
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <AccountMenu />
      <button
        type="button"
        onClick={() => setCartOpen(true)}
        aria-label="Cart"
        className="flex items-center gap-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
      >
        <HugeiconsIcon icon={ShoppingBag01Icon} size={19} strokeWidth={1.5} />
        <span className="text-xs font-semibold ml-0.5">{items?.length}</span>
      </button>
      <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
export default RightActions;
