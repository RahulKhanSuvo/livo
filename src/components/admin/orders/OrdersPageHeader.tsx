'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { OrdersHeader } from './OrdersHeader';
import { OrdersStatusTabs, type StatusTabKey, type StatusCounts } from './OrdersStatusTabs';
import { OrdersToolbar, type OrderSortOption } from './OrdersToolbar';
import type { OrderStatus } from '@/generated/prisma/client';
import { useCallback } from 'react';

interface OrdersPageHeaderProps {
  title?: string;
  subtitle?: string;
  activeStatus?: OrderStatus | 'ALL';
  counts?: StatusCounts;
  search?: string;
  sort?: OrderSortOption;
}

export function OrdersPageHeader({
  title,
  subtitle,
  activeStatus,
  counts,
  search,
  sort,
}: OrdersPageHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  return (
    <div className="flex flex-col gap-5 mb-6">
      {/* 1. Header Section */}
      <OrdersHeader title={title} subtitle={subtitle} />

      {/* 2. Status Tabs Bar */}
      <OrdersStatusTabs
        activeStatus={activeStatus}
        counts={counts}
        onStatusChange={handleStatusChange}
      />

      {/* 3. Search & Filter Controls Toolbar */}
      <OrdersToolbar search={search} sort={sort} />
    </div>
  );
}
