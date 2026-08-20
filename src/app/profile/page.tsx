import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PackageOpenIcon,
  ArrowRight01Icon,
  GridIcon,
  StarIcon,
  RefreshIcon,
  DocumentValidationIcon,
} from '@hugeicons/core-free-icons';
import { getProfileUser } from '@/components/profile/get-session';
import { getOrders } from './_action';
import { Button } from '@/components/ui/button';
import {
  formatMoney,
  formatDate,
  initials,
  orderStatusLabels,
} from '@/components/profile/profile.data';

export default async function ProfilePage() {
  const user = await getProfileUser();
  const orders = await getOrders(user.id);

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const activeOrders = orders.filter(
    (o) => o.status !== 'CANCELLED' && o.status !== 'DELIVERED'
  ).length;
  const recentOrders = orders.slice(0, 2);

  return (
    <div className="bg-[#f6f5f1] text-[#161512]">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Your account
        </p>
        <div className="mt-4 flex flex-col gap-6 border-b border-neutral-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#161512] text-2xl text-primary-foreground">
              {initials(user.name)}
            </div>
            <div>
              <h1 className=" text-4xl sm:text-5xl">{user.name}</h1>
              <p className="mt-1 text-sm text-neutral-600">{user.email}</p>
            </div>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/profile/settings">Edit profile</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-sm border border-neutral-200 bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
              Total orders
            </p>
            <p className="mt-3 font-(family-name:--font-instrument-serif) text-4xl">
              {orders.length}
            </p>
          </div>
          <div className="rounded-sm border border-neutral-200 bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
              Total spent
            </p>
            <p className="mt-3 font-(family-name:--font-instrument-serif) text-4xl">
              {formatMoney(totalSpent)}
            </p>
          </div>
          <div className="rounded-sm border border-neutral-200 bg-white p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">
              In progress
            </p>
            <p className="mt-3 font-(family-name:--font-instrument-serif) text-4xl">
              {activeOrders}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-4">
          <Link
            href="/profile/orders"
            className="group rounded-sm border border-neutral-200 bg-[#a3b899]/30 p-5 transition-colors hover:border-neutral-300"
          >
            <HugeiconsIcon icon={PackageOpenIcon} size={24} strokeWidth={1.5} />
            <p className="mt-4 text-sm font-semibold">Orders</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
              <span>View history</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
          <Link
            href="/profile/my-reviews"
            className="group rounded-sm border border-neutral-200 bg-sidebar-primary/25 p-5 transition-colors hover:border-neutral-300"
          >
            <HugeiconsIcon icon={StarIcon} size={24} strokeWidth={1.5} />
            <p className="mt-4 text-sm font-semibold">My reviews</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
              <span>Share feedback</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
          <Link
            href="/profile/collections"
            className="group rounded-sm border border-neutral-200 bg-neutral-100 p-5 transition-colors hover:border-neutral-300"
          >
            <HugeiconsIcon icon={GridIcon} size={24} strokeWidth={1.5} />
            <p className="mt-4 text-sm font-semibold">Collections</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
              <span>Saved pieces</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
          <Link
            href="/profile/returns"
            className="group rounded-sm border border-neutral-200 bg-[#f6f5f1] p-5 transition-colors hover:border-neutral-300"
          >
            <HugeiconsIcon icon={RefreshIcon} size={24} strokeWidth={1.5} />
            <p className="mt-4 text-sm font-semibold">Returns</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-neutral-600">
              <span>Start a return</span>
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </div>
          </Link>
        </div>

        <div className="mt-14">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="font-(family-name:--font-instrument-serif) text-3xl">Recent orders</h2>
            <Link
              href="/profile/orders"
              className="text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              View all
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center rounded-sm border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
              <HugeiconsIcon icon={DocumentValidationIcon} size={32} strokeWidth={1.5} />
              <p className="mt-4 text-sm font-semibold">No orders yet</p>
              <p className="mt-1 max-w-sm text-sm text-neutral-500">
                When you place an order, it will appear here with its status and tracking.
              </p>
              <Button asChild className="mt-6">
                <Link href="/shop">Browse the collection</Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white">
              {recentOrders.map((order, i) => (
                <div
                  key={order.id}
                  className={
                    'flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between ' +
                    (i > 0 ? 'border-t border-neutral-100' : '')
                  }
                >
                  <div>
                    <p className="text-xs text-neutral-500">{formatDate(order.createdAt)}</p>
                    <p className="mt-1 font-semibold">#{order.orderNumber}</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="text-sm text-neutral-600">
                      {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                    </span>
                    <span className="text-sm font-semibold">{formatMoney(order.total)}</span>
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold capitalize text-primary">
                      {orderStatusLabels[order.status]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
