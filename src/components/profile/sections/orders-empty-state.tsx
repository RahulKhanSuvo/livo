import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

export function OrdersEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[#161512]/15 bg-white/60 px-6 py-20 text-center">
      <div aria-hidden className="bg-grain absolute inset-0 opacity-40" />
      <div className="relative mx-auto flex max-w-sm flex-col items-center">
        <div className="grid size-20 place-items-center rounded-full bg-[#f0ece4] text-[#4b6b56]">
          <HugeiconsIcon icon={PackageOpenIcon} size={34} strokeWidth={1.5} />
        </div>
        <h3 className="mt-8 font-serif text-3xl tracking-tight text-[#161512]">No orders yet</h3>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60">
          Your future favourites are waiting. When you place an order, its journey will appear here.
        </p>
        <Link
          href="/shop"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold tracking-wider text-[#f4f1e8] uppercase transition-colors hover:bg-[#4b6b56]"
        >
          Explore the collection
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            size={14}
            strokeWidth={2}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
