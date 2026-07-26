import Link from 'next/link';

import { Search01Icon, ShoppingBag01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

export const RightActions = () => (
  <div className="flex items-center gap-5">
    <div>
      <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.5} />
    </div>

    <Link href="/account" className="text-neutral-800 hover:text-black transition-colors">
      <HugeiconsIcon icon={UserIcon} size={20} strokeWidth={1.5} />
    </Link>

    <Link href="/cart" className="relative text-neutral-800 hover:text-black transition-colors">
      <HugeiconsIcon icon={ShoppingBag01Icon} size={20} strokeWidth={1.5} />
      <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4c4a45] text-[10px] font-medium text-white">
        8
      </span>
    </Link>
  </div>
);
