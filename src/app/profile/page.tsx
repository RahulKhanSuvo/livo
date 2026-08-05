import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PackageOpenIcon,
  ArrowRight01Icon,
  StarIcon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getOrders } from './_action';
import { formatMoney } from '@/components/profile/profile.data';

export default async function ProfileOverviewPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const orders = await getOrders(session.user.id);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="font-serif text-4xl tracking-tight text-[#161512] sm:text-5xl">
          Dashboard
          <span className="text-[#d98e63]">.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[#4c4a45]/60">
          A quick look at your account activity.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:gap-5">
        <StatCard
          icon={<HugeiconsIcon icon={PackageOpenIcon} size={20} strokeWidth={1.8} />}
          label="Total orders"
          value={String(orders.length)}
          accent="bg-[#4b6b56]/10 text-[#35503e]"
        />
        <StatCard
          icon={<span className="text-base font-semibold">$</span>}
          label="Total spent"
          value={formatMoney(totalSpent)}
          accent="bg-[#d98e63]/10 text-[#8a5a2e]"
        />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink
          href="/profile/my-reviews"
          icon={<HugeiconsIcon icon={StarIcon} size={18} strokeWidth={2} />}
          label="Reviews"
        />
        <QuickLink
          href="/profile/returns"
          icon={<HugeiconsIcon icon={RefreshIcon} size={18} strokeWidth={2} />}
          label="Returns"
        />
        <QuickLink
          href="/profile/settings"
          icon={<HugeiconsIcon icon={PackageOpenIcon} size={18} strokeWidth={2} />}
          label="Manage profile"
        />
      </div>

      {/* Recent orders */}
      {recentOrders.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-2xl tracking-tight text-[#161512]">
              Recent orders
              <span className="text-[#d98e63]">.</span>
            </h2>
            <Link
              href="/profile/orders"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#4b6b56] uppercase transition-colors hover:text-[#35503e]"
            >
              View all
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-2xl border border-[#161512]/10 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.25em] text-[#4c4a45]/40 uppercase">
                      Order
                    </p>
                    <p className="mt-0.5 font-medium text-[#161512]">#{order.orderNumber}</p>
                  </div>
                  <p className="text-sm text-[#4c4a45]/55">{order.itemCount} items</p>
                </div>
                <p className="font-serif text-lg text-[#161512]">{formatMoney(order.total)}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {orders.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#161512]/15 bg-white/60 px-6 py-16 text-center">
          <p className="font-serif text-2xl text-[#161512]">No activity yet</p>
          <p className="mt-2 text-sm text-[#4c4a45]/60">
            Once you start shopping, your orders will appear here.
          </p>
          <Link
            href="/shop"
            className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[#161512] px-6 py-3 text-xs font-semibold tracking-wider text-[#f4f1e8] uppercase transition-colors hover:bg-[#4b6b56]"
          >
            Explore the collection
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-[#161512]/10 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`grid size-9 place-items-center rounded-lg ${accent}`}>{icon}</div>
        <span className="text-xs font-medium tracking-wider text-[#4c4a45]/55 uppercase">
          {label}
        </span>
      </div>
      <p className="font-serif text-3xl tracking-tight text-[#161512]">{value}</p>
    </div>
  );
}

function QuickLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 rounded-2xl border border-[#161512]/10 bg-white px-5 py-4 shadow-sm transition-all hover:border-[#4b6b56]/30 hover:shadow-md"
    >
      <div className="grid size-9 place-items-center rounded-lg bg-[#4b6b56]/10 text-[#4b6b56]">
        {icon}
      </div>
      <span className="text-sm font-medium text-[#161512] group-hover:text-[#4b6b56] transition-colors">
        {label}
      </span>
      <HugeiconsIcon
        icon={ArrowRight01Icon}
        size={14}
        strokeWidth={2}
        className="ml-auto text-[#4c4a45]/30 transition-all group-hover:translate-x-1 group-hover:text-[#4b6b56]"
      />
    </Link>
  );
}
