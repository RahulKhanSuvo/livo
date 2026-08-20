'use client';

import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  PackageIcon,
  PackageOutOfStockIcon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '../../ui/stat-card';
import { getProductStatsAction } from '@/actions/products/getProductStatsAction';
import { useQuery } from '@tanstack/react-query';
import { StatCardsSkeleton } from '@/components/admin/ui/admin-skeletons';

export default function ProductsState() {
  const { data, isLoading } = useQuery({
    queryKey: ['product-stats'],
    queryFn: () => getProductStatsAction(),
    staleTime: 5 * 60 * 1000, // cache for 5 minutes
  });

  if (isLoading) return <StatCardsSkeleton />;

  const stats = data?.data ?? { total: 0, active: 0, outOfStock: 0, lowStock: 0 };

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
