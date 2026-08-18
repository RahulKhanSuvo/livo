'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { DataTable } from '@/components/shared/data-table';
import { useServerPagination } from '@/hooks/useServerPagination';
import { orderColumns } from './columns';
import { getAllOrdersAction } from '@/actions/order/getAllOrdersAction';
import { OrderDetailModal } from './order-detail-modal';
import { OrderStatusModal } from './order-status-modal';
import { OrderCancelModal } from './order-cancel-modal';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatMoney } from '@/components/admin/ui/format';
import type { OrderStatus } from '@/generated/prisma/client';
import { orderSteps } from './orders.data';

const tabs = [
  { id: 'ALL', label: 'All' },
  ...orderSteps.map((s) => ({ id: s.id, label: s.label })),
  { id: 'CANCELLED', label: 'Cancelled' },
];

export function OrdersPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status') ?? 'ALL';

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusOrderId, setStatusOrderId] = useState<string | null>(null);
  const [statusCurrent, setStatusCurrent] = useState<OrderStatus | undefined>(undefined);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  const { paginationState, handlePaginationChange, isPending } = useServerPagination({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;

  const { data } = useQuery({
    queryKey: ['orders', status, currentPage, currentLimit],
    queryFn: () => getAllOrdersAction({ page: currentPage, limit: currentLimit, status }),
  });

  const orders = data?.data?.orders ?? [];
  const total = data?.data?.total ?? 0;
  const statusCounts = data?.data?.statusCounts ?? {};
  const stats = data?.data?.stats ?? { revenue: 0, awaitingPayment: 0, toFulfil: 0 };

  const counts: Record<string, number> = { ALL: total, ...statusCounts };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track, manage and fulfil every order across your storefront."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Export</Button>
            <Button>New order</Button>
          </div>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Total orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold">{total}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Revenue (paid)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold">{formatMoney(stats.revenue)}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Awaiting payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold">{stats.awaitingPayment}</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>To fulfil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold">{stats.toFulfil}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-foreground/10">
        {tabs.map((tab) => {
          const isActive = status === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/admin/orders${tab.id === 'ALL' ? '' : `?status=${tab.id}`}`}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar text-[#f4f1e8]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? 'bg-white/15' : 'bg-muted text-muted-foreground'
                }`}
              >
                {counts[tab.id] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      <DataTable
        isPending={isPending}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: total,
        }}
        columns={orderColumns({
          onViewDetails: (id) => setSelectedOrderId(id),
          onUpdateStatus: (id, currentStatus) => {
            setStatusOrderId(id);
            setStatusCurrent(currentStatus);
          },
          onCancel: (id) => setCancelOrderId(id),
        })}
        data={orders}
        tableKey="orders-table"
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
