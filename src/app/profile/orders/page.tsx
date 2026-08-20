import Link from 'next/link';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';
import { getOrders } from '../_action';
import { Button } from '@/components/ui/button';
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
    <div className="bg-white text-[#161512]">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-sidebar-primary">
          Order history
        </p>
        <h1 className="mt-4 text-5xl font-medium tracking-tight">Your orders</h1>
        <p className="mt-3 text-sm font-light text-neutral-600">
          Follow every piece from workshop to your door.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center border border-neutral-200 bg-[#fbfaf7] px-6 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center bg-neutral-100">
              <HugeiconsIcon icon={PackageOpenIcon} size={26} strokeWidth={1.5} />
            </div>
            <h2 className="mt-6 text-2xl font-medium tracking-tight">Nothing here yet</h2>
            <p className="mt-2 max-w-sm text-sm font-light text-neutral-500">
              Your placed orders will live here with live status and delivery updates.
            </p>
            <Button asChild className="group mt-8">
              <Link href="/shop">
                Start shopping
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={14}
                  className="transition-transform group-hover/button:translate-x-0.5"
                />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <article key={order.id} className="border border-neutral-200 bg-white">
                <div className="flex flex-col gap-2 border-b border-neutral-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                      Ordered {formatDate(order.createdAt)}
                    </p>
                    <p className="mt-1 text-sm font-medium">Order #{order.orderNumber}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-5">
                    <span
                      className={
                        'text-[11px] font-medium uppercase tracking-wider ' +
                        (order.status === 'CANCELLED' ? 'text-red-600' : 'text-primary')
                      }
                    >
                      {orderStatusLabels[order.status]}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">
                      {paymentStatusLabels[order.paymentStatus]}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-5">
                  <ul className="divide-y divide-neutral-100">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-4 py-3">
                        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden bg-neutral-100">
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
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="mt-0.5 text-xs font-light text-neutral-500">
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

                <div className="flex items-center justify-between border-t border-neutral-100 px-6 py-4">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                    {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                  </span>
                  <span className="text-sm font-medium">Total {formatMoney(order.total)}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
