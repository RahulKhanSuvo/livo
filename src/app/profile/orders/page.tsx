import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';
import { getOrders } from '../_action';
import {
  formatMoney,
  formatDate,
  orderStatusLabels,
  paymentStatusLabels,
} from '@/components/profile/profile.data';

export default async function OrdersPage() {
  const user = await getProfileUser();
  const orders = await getOrders(user.id);

  return (
    <div className="bg-[#fbfaf7] text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d98e63]">
          Order history
        </p>
        <h1 className="mt-4 font-(family-name:--font-instrument-serif) text-4xl sm:text-5xl">
          Your orders
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          Follow every piece from workshop to your door.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl bg-white px-6 py-20 text-center shadow-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
              <HugeiconsIcon icon={PackageOpenIcon} size={28} strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 font-[family-name:var(--font-instrument-serif)] text-2xl">
              Nothing here yet
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-500">
              Your placed orders will live here with live status and delivery updates.
            </p>
            <Link
              href="/shop"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#f4f1e8] transition-colors hover:bg-[#d98e63]"
            >
              Start shopping
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-2 border-b border-neutral-100 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-neutral-500">
                      Ordered {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold">Order #{order.orderNumber}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={
                        'rounded-full px-3 py-1 text-xs font-semibold ' +
                        (order.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-[#4b6b56]/15 text-[#4b6b56]')
                      }
                    >
                      {orderStatusLabels[order.status]}
                    </span>
                    <span className="rounded-full bg-neutral-200/70 px-3 py-1 text-xs font-semibold text-neutral-700">
                      {paymentStatusLabels[order.paymentStatus]}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <ul className="divide-y divide-neutral-50">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 py-3">
                        <div
                          className={
                            'flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100'
                          }
                        >
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl">🪑</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="mt-0.5 text-xs text-neutral-500">
                            Qty {item.quantity} · {formatMoney(item.unitPrice)} each
                          </p>
                        </div>
                        <span className="text-sm font-medium">
                          {formatMoney(item.unitPrice * item.quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50 px-6 py-4">
                  <span className="text-xs uppercase tracking-wider text-neutral-500">
                    {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-semibold">Total {formatMoney(order.total)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
