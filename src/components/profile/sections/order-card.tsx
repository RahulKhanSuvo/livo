import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import {
  formatMoney,
  formatDate,
  orderStatusLabels,
  paymentStatusLabels,
  type ProfileOrder,
} from '../profile.data';

const statusStyles: Record<string, { badge: string; dot: string }> = {
  PENDING: { badge: 'bg-[#f0e6d2] text-[#8a6d2f]', dot: 'bg-[#c9a24b]' },
  CONFIRMED: { badge: 'bg-[#e7efe9] text-[#3d5747]', dot: 'bg-[#6f9278]' },
  PROCESSING: { badge: 'bg-[#e7efe9] text-[#3d5747]', dot: 'bg-[#6f9278]' },
  SHIPPED: { badge: 'bg-[#e3edf3] text-[#2f5a6e]', dot: 'bg-[#4f8ba6]' },
  DELIVERED: { badge: 'bg-[#4b6b56]/12 text-[#35503e]', dot: 'bg-[#4b6b56]' },
  CANCELLED: { badge: 'bg-[#f3e1de] text-[#8c3a2e]', dot: 'bg-[#c25b4e]' },
};

const paymentStyles: Record<string, string> = {
  PENDING: 'text-[#8a6d2f]',
  PAID: 'text-[#35503e]',
  FAILED: 'text-[#8c3a2e]',
  REFUNDED: 'text-[#4c4a45]/55',
};

export function OrderCard({ order }: { order: ProfileOrder }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#161512]/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161512]/5 bg-white/60 px-6 py-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#4c4a45]/45 uppercase">
              Order
            </p>
            <p className="mt-0.5 font-medium text-[#161512]">#{order.orderNumber}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#4c4a45]/45 uppercase">
              Placed on
            </p>
            <p className="mt-0.5 text-sm text-[#4c4a45]">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
              statusStyles[order.status]?.badge
            )}
          >
            <span
              className={cn(
                'size-1.5 rounded-full',
                statusStyles[order.status]?.dot ?? 'bg-[#4c4a45]'
              )}
            />
            {orderStatusLabels[order.status]}
          </span>
          <span
            className={cn(
              'text-xs font-medium',
              paymentStyles[order.paymentStatus] ?? 'text-[#4c4a45]/55'
            )}
          >
            {paymentStatusLabels[order.paymentStatus]}
          </span>
        </div>
      </header>

      <div className="px-6 py-5">
        <ul className="divide-y divide-[#161512]/5">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f3f2ef]">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="font-serif text-lg text-[#4c4a45]/40">L</span>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <Link
                  href={`/shop/${item.slug}`}
                  className="block truncate text-sm font-medium text-[#161512] transition-colors hover:text-[#4b6b56]"
                >
                  {item.name}
                </Link>
                <p className="mt-0.5 text-xs text-[#4c4a45]/55">Quantity {item.quantity}</p>
              </div>

              <p className="text-sm font-medium text-[#161512]">
                {formatMoney(item.unitPrice * item.quantity)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <footer className="flex items-center justify-between border-t border-[#161512]/5 bg-white/60 px-6 py-4">
        <p className="text-sm text-[#4c4a45]/55">
          {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
        </p>
        <div className="flex items-center gap-6">
          <p className="text-sm text-[#4c4a45]/55">
            Total{' '}
            <span className="ml-1 font-serif text-lg text-[#161512]">
              {formatMoney(order.total)}
            </span>
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#4b6b56] uppercase transition-colors hover:text-[#35503e]"
          >
            View details
            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} strokeWidth={2} />
          </Link>
        </div>
      </footer>
    </article>
  );
}
