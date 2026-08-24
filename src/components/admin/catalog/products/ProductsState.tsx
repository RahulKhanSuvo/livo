'use client';

import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  PackageIcon,
  PackageOutOfStockIcon,
} from '@hugeicons/core-free-icons';

import { useSuspenseQuery } from '@tanstack/react-query';

import { StatCard } from '../../ui/stat-card';

import { productStatsQuery } from '@/queries/product-stats.query';

export default function ProductsState() {
  const { data } = useSuspenseQuery(productStatsQuery());

  const stats = data?.data ?? {
    total: 0,
    active: 0,
    outOfStock: 0,
    lowStock: 0,
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total products" value={String(stats.total)} icon={PackageIcon} />

      <StatCard
        label="Active"
        value={String(stats.active)}
        icon={CheckmarkCircle01Icon}
        accent="var(--sidebar-primary)"
      />

      <StatCard label="Low stock" value={String(stats.lowStock)} hint="" icon={Alert01Icon} />

      <StatCard
        label="Out of stock"
        value={String(stats.outOfStock)}
        icon={PackageOutOfStockIcon}
        accent="var(--sidebar-primary)"
      />
    </div>
  );
}
