'use client';

import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { OrderQuery } from '@/actions/order/order.validation';
import { ordersQueryOptions, ordersCountsQueryOptions } from '@/queries/orders.query';
import { OrdersPageHeader } from './OrdersPageHeader';
import { OrdersTable } from './OrdersTable';
import { OrderStatusModal } from './order-status-modal';
import type { OrderStatus } from '@/generated/prisma/client';
import type { StatusTabKey } from './OrdersStatusTabs';
import type { OrderSortOption } from './OrdersToolbar';

const OrdersPage = ({ query }: { query: OrderQuery }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: response } = useSuspenseQuery(ordersQueryOptions(query));
  const { data: counts } = useQuery(ordersCountsQueryOptions());

  // Modal states

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusOrderId, setStatusOrderId] = useState<string | null>(null);
  const [statusCurrent, setStatusCurrent] = useState<OrderStatus | undefined>(undefined);

  const orders = response?.data ?? [];

  const updateParams = useCallback(
    (updates: Record<string, string | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '' || value === 'ALL') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      params.set('page', '1');
      router.push(`/admin/orders?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleStatusChange = (newStatus: StatusTabKey) => {
    updateParams({ status: newStatus === 'ALL' ? null : newStatus });
  };

  const handleSearchChange = (searchTerm: string) => {
    updateParams({ search: searchTerm });
  };

  const handleSortChange = (newSort: OrderSortOption) => {
    updateParams({ sort: newSort === 'newest' ? null : newSort });
  };

  const handleUpdateStatus = (id: string, currentStatus: OrderStatus) => {
    setStatusOrderId(id);
    setStatusCurrent(currentStatus);
    setStatusModalOpen(true);
  };

  const activeStatus = (query.status as OrderStatus) ?? 'ALL';
  const activeSort = (query.sort as OrderSortOption) ?? 'newest';
  const activeSearch = query.search ?? '';

  return (
    <>
      <div className="w-full">
        {/* Modular Orders Page Header Section */}
        <OrdersPageHeader
          activeStatus={activeStatus}
          counts={counts}
          search={activeSearch}
          sort={activeSort}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        />

        <OrdersTable orders={orders} onUpdateStatus={handleUpdateStatus} />
      </div>

      {/* Modals */}

      <OrderStatusModal
        orderId={statusOrderId}
        currentStatus={statusCurrent}
        open={statusModalOpen}
        onOpenChange={setStatusModalOpen}
        onUpdated={() => {
          setStatusOrderId(null);
        }}
      />
    </>
  );
};

export default OrdersPage;
