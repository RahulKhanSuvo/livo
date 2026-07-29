import Link from 'next/link';
import {
  Search01Icon,
  ShoppingBag01Icon,
  UserIcon,
  FavouriteIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

interface RightActionsProps {
  onOpenSearch?: () => void;
  onOpenCart?: () => void;
}

export const RightActions = ({ onOpenSearch, onOpenCart }: RightActionsProps) => (
  <div className="flex items-center gap-4 sm:gap-6">
    <Link
      href="/store-locator"
      className="hidden md:inline-block text-[11px] font-semibold tracking-wider text-neutral-800 hover:text-black uppercase transition-colors"
    >
      Get Directions
    </Link>

    <Link
      href="/wishlist"
      aria-label="Wishlist"
      className="text-neutral-800 hover:text-black transition-colors"
    >
      <HugeiconsIcon icon={FavouriteIcon} size={19} strokeWidth={1.5} />
    </Link>

    <Link
      href="/account"
      aria-label="Account"
      className="text-neutral-800 hover:text-black transition-colors"
    >
      <HugeiconsIcon icon={UserIcon} size={19} strokeWidth={1.5} />
    </Link>

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
