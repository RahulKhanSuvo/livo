'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState, useTransition } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  PackageIcon,
  CheckmarkCircle01Icon,
  Alert01Icon,
  PackageOutOfStockIcon,
  Search01Icon,
  Download01Icon,
} from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import { useServerPagination } from '@/hooks/useServerPagination';
import { getAllOrdersAction } from '@/actions/order/getAllOrdersAction';
import { OrderDetailModal } from './order-detail-modal';
import { OrderStatusModal } from './order-status-modal';
import { OrderCancelModal } from './order-cancel-modal';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { StatCard } from '@/components/admin/ui/stat-card';
import { formatMoney } from '@/components/admin/ui/format';
import { DataTable } from '@/components/shared/data-table';
import { orderColumns } from './columns';
import type { OrderStatus } from '@/generated/prisma/client';
import { orderSteps } from './orders.data';

const tabs = [
  { id: 'ALL', label: 'All' },
  ...orderSteps.map((s) => ({ id: s.id, label: s.label })),
  { id: 'CANCELLED', label: 'Cancelled' },
];

export function OrdersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const status = searchParams.get('status') ?? 'ALL';

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusOrderId, setStatusOrderId] = useState<string | null>(null);
  const [statusCurrent, setStatusCurrent] = useState<OrderStatus | undefined>(undefined);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  const { paginationState, isPending, handlePaginationChange } = useServerPagination({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  // ---- Search (debounced + URL-synced) ----
  const [searchInput, setSearchInput] = useState(() => searchParams.get('search') ?? '');

  const [debouncedSearch, setDebouncedSearch] = useState(() => searchParams.get('search') ?? '');

  const [searchPending, startSearchTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);

      const params = new URLSearchParams(window.location.search);

      if (searchInput.trim()) {
        params.set('search', searchInput.trim());
      } else {
        params.delete('search');
      }

      params.delete('page');

      const qs = params.toString();

      startSearchTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ''}`, { scroll: false });
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, pathname, router]);

  const isLoading = isPending || searchPending;

  const { data } = useQuery({
    queryKey: [
      'orders',
      status,
      paginationState.pageIndex,
      paginationState.pageSize,
      debouncedSearch,
    ],
    queryFn: () =>
      getAllOrdersAction({
        page: paginationState.pageIndex + 1,
        limit: paginationState.pageSize,
        status,
        search: debouncedSearch,
      }),
  });

  const orders = data?.data?.orders ?? [];
  const total = data?.data?.total ?? 0;
  const statusCounts = data?.data?.statusCounts ?? {};
  const stats = data?.data?.stats ?? { revenue: 0, awaitingPayment: 0, toFulfil: 0 };

  const counts: Record<string, number> = { ALL: total, ...statusCounts };

  const columns = orderColumns({
    onViewDetails: (id) => setSelectedOrderId(id),
    onUpdateStatus: (id, currentStatus) => {
      setStatusOrderId(id);
      setStatusCurrent(currentStatus);
    },
    onCancel: (id) => setCancelOrderId(id),
  });

  const buildHref = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tabId === 'ALL') params.delete('status');
    else params.set('status', tabId);
    params.delete('page');
    const qs = params.toString();
    return `/admin/orders${qs ? `?${qs}` : ''}`;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track, manage and fulfil every order across your storefront."
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total orders" value={String(total)} icon={PackageIcon} />
        <StatCard
          label="Revenue (paid)"
          value={formatMoney(stats.revenue)}
          icon={CheckmarkCircle01Icon}
        />
        <StatCard
          label="Awaiting payment"
          value={String(stats.awaitingPayment)}
          icon={Alert01Icon}
          accent="#d98e63"
        />
        <StatCard label="To fulfil" value={String(stats.toFulfil)} icon={PackageOutOfStockIcon} />
      </div>

      {/* Control bar */}
      <div className="flex flex-col gap-4 rounded-sm bg-card p-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1.5 overflow-x-auto rounded-sm bg-[#f7f6f1] p-1.5 ring-1 ring-inset ring-foreground/6 dark:bg-muted/40">
          {tabs.map((tab) => {
            const isActive = status === tab.id;
            const count = counts[tab.id] ?? 0;
            return (
              <Link
                key={tab.id}
                href={buildHref(tab.id)}
                className={cn(
                  'inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-sidebar text-sidebar-foreground shadow-[0_2px_8px_-2px_rgba(75,107,86,0.55)]'
                    : 'text-muted-foreground hover:bg-white hover:text-foreground dark:hover:bg-background'
                )}
              >
                {tab.label}
                <span
                  className={cn(
                    'rounded-sm px-1.5 py-0.5 text-[10px] font-semibold',
                    isActive
                      ? 'bg-white/15 text-sidebar-foreground'
                      : 'bg-background text-muted-foreground ring-1 ring-foreground/10 dark:ring-foreground/15'
                  )}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <HugeiconsIcon
              icon={Search01Icon}
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search orders, customers…"
              className="h-9 w-full rounded-sm border-border/60 bg-card pl-9 pr-3 shadow-[0_1px_2px_rgba(28,39,32,0.04)] focus-visible:ring-[#4b6b56]/30"
            />
          </div>
          <Button variant="secondary" className="shrink-0 gap-1.5">
            <HugeiconsIcon icon={Download01Icon} size={16} />
            Export
          </Button>
        </div>
      </div>

      <DataTable
        data={orders}
        columns={columns}
        tableKey="orders"
        emptyMessage="No orders match your filters."
        isPending={isLoading}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: total,
        }}
      />

      <OrderDetailModal
        orderId={selectedOrderId}
        open={!!selectedOrderId}
        onOpenChange={(o) => {
          if (!o) setSelectedOrderId(null);
        }}
      />

      <OrderStatusModal
        key={statusOrderId ?? 'none'}
        orderId={statusOrderId}
        currentStatus={statusCurrent}
        open={!!statusOrderId}
        onOpenChange={(o) => {
          if (!o) setStatusOrderId(null);
        }}
        onUpdated={() => {}}
      />

      <OrderCancelModal
        orderId={cancelOrderId}
        open={!!cancelOrderId}
        onOpenChange={(o) => {
          if (!o) setCancelOrderId(null);
        }}
        onCancelled={() => {}}
      />
    </div>
  );
}
