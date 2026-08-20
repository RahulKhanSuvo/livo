import {
  Activity01Icon,
  RefreshIcon,
  UserAdd01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '@/components/admin/ui/stat-card';
import { getCustomerStatsAction } from '@/actions/customer/getCustomerStatsAction';

export default async function CustomersState() {
  const { data } = await getCustomerStatsAction();
  const stats = data ?? { total: 0, newThisMonth: 0, repeat: 0, active: 0 };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Total Customers" value={String(stats.total)} icon={UserGroupIcon} />
      <StatCard
        label="New Customers"
        value={String(stats.newThisMonth)}
        hint="this month"
        icon={UserAdd01Icon}
      />
      <StatCard
        label="Repeat Customers"
        value={String(stats.repeat)}
        hint="2+ orders"
        icon={RefreshIcon}
      />
      <StatCard
        label="Active Customers"
        value={String(stats.active)}
        hint="last 90 days"
        icon={Activity01Icon}
        accent="var(--sidebar-primary)"
      />
    </div>
  );
}
