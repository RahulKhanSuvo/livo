'use client';

import { ShoppingBag01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { AccountMenu } from './account-menu';

interface RightActionsProps {
  onOpenCart?: () => void;
}

export const RightActions = ({ onOpenCart }: RightActionsProps) => (
  <div className="flex items-center gap-4 sm:gap-6">
    <AccountMenu />
    <button
      type="button"
      onClick={onOpenCart}
      aria-label="Cart"
      className="flex items-center gap-1 text-neutral-800 hover:text-black transition-colors cursor-pointer"
    >
      <HugeiconsIcon icon={ShoppingBag01Icon} size={19} strokeWidth={1.5} />
      <span className="text-xs font-semibold ml-0.5">1</span>
    </button>
  </div>
);

export default RightActions;
