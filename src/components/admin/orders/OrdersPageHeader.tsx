'use client';

import { OrdersHeader } from './OrdersHeader';
import { OrdersStatusTabs, type StatusTabKey, type StatusCounts } from './OrdersStatusTabs';
import { OrdersToolbar, type OrderSortOption } from './OrdersToolbar';
import type { OrderStatus } from '@/generated/prisma/client';

interface OrdersPageHeaderProps {
  title?: string;
  subtitle?: string;
  activeStatus?: OrderStatus | 'ALL';
  counts?: StatusCounts;
  search?: string;
  sort?: OrderSortOption;
  onStatusChange: (status: StatusTabKey) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: OrderSortOption) => void;
}

export function OrdersPageHeader({
  title,
  subtitle,
  activeStatus,
  counts,
  search,
  sort,
  onStatusChange,
  onSearchChange,
  onSortChange,
}: OrdersPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 mb-6">
      {/* 1. Header Section */}
      <OrdersHeader title={title} subtitle={subtitle} />

      {/* 2. Status Tabs Bar */}
      <OrdersStatusTabs
        activeStatus={activeStatus}
        counts={counts}
        onStatusChange={onStatusChange}
      />

      {/* 3. Search & Filter Controls Toolbar */}
      <OrdersToolbar
        search={search}
        sort={sort}
        onSearchChange={onSearchChange}
        onSortChange={onSortChange}
      />
    </div>
  );
}
