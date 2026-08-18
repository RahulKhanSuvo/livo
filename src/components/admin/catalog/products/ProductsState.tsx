import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  PackageIcon,
  PackageOutOfStockIcon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '../../ui/stat-card';
import { getProductStatsAction } from '@/actions/products/getProductStatsAction';

export default async function ProductsState() {
  const { data } = await getProductStatsAction();
  const stats = data ?? { total: 0, active: 0, outOfStock: 0, lowStock: 0 };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total products" value={String(stats.total)} icon={PackageIcon} />
      <StatCard
        label="Active"
        value={String(stats.active)}
        icon={CheckmarkCircle01Icon}
        accent="#d98e63"
      />
      <StatCard
        label="Low stock"
        value={String(stats.lowStock)}
        hint="reorder needed"
        icon={Alert01Icon}
      />
      <StatCard
        label="Out of stock"
        value={String(stats.outOfStock)}
        icon={PackageOutOfStockIcon}
        accent="#d98e63"
      />
    </div>
  );
}
