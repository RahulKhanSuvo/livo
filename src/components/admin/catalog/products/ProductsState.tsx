import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  PackageIcon,
  PackageOutOfStockIcon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '../../ui/stat-card';

function ProductsState() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total products" value="181" delta="+6.2%" icon={PackageIcon} />
      <StatCard
        label="Active"
        value="152"
        delta="+4.1%"
        icon={CheckmarkCircle01Icon}
        accent="#d98e63"
      />
      <StatCard label="Low stock" value="8" hint="reorder needed" icon={Alert01Icon} />
      <StatCard
        label="Out of stock"
        value="5"
        delta="-2"
        trend="down"
        icon={PackageOutOfStockIcon}
        accent="#d98e63"
      />
    </div>
  );
}
export default ProductsState;
