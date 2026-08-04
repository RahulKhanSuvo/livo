'use client';

import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, ArrowUpRight01Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import {
  formatMoney,
  formatDate,
  orderStatusLabels,
  paymentStatusLabels,
  type ProfileOrder,
} from './profile.data';

interface OrdersTabProps {
  orders: ProfileOrder[];
}

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

export function OrdersTab({ orders }: OrdersTabProps) {
  if (orders.length === 0) {
    return <OrdersEmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="font-serif text-3xl tracking-tight text-[#161512]">
          Your orders
          <span className="text-[#d98e63]">.</span>
        </h2>
        <span className="text-sm text-[#4c4a45]/55">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </span>
      </div>

      <div className="space-y-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="overflow-hidden rounded-2xl border border-[#161512]/10 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Header */}
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

            {/* Body */}
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

            {/* Footer */}
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
        ))}
      </div>
    </div>
  );
}

function OrdersEmptyState() {
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
