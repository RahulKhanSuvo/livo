'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingCart02Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-50/50 py-16 px-4 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-white shadow-xs border border-neutral-200 mb-4">
        <HugeiconsIcon icon={ShoppingCart02Icon} size={28} className="text-neutral-400" />
      </div>
      <h2 className="text-xl font-serif font-medium text-neutral-800 mb-2">Your cart is empty</h2>
      <p className="max-w-md text-sm text-neutral-500 mb-6">
        Looks like you haven&apos;t added anything to your cart yet. Explore our furniture
        collection and discover statement pieces for your home.
      </p>
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 rounded-xl bg-[#4b6b56] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#3d5747]"
      >
        <span>Explore Collection</span>
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
      </Link>
    </div>
  );
}
