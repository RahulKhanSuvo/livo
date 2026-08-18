import {
  BanknoteIcon,
  CheckmarkCircle01Icon,
  RefreshIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '@/components/admin/ui/stat-card';
import { formatMoney } from '@/components/admin/ui/format';
import { getPaymentsStatsAction } from '@/actions/payments/getPaymentsStatsAction';

export default async function PaymentsState() {
  const { data } = await getPaymentsStatsAction();
  const stats = data ?? {
    processedThisMonth: 0,
    pendingPayouts: 0,
    successRate: 0,
    refundsPercent: 0,
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Processed this month"
        value={formatMoney(stats.processedThisMonth)}
        icon={BanknoteIcon}
      />
      <StatCard
        label="Success rate"
        value={`${stats.successRate}%`}
        icon={CheckmarkCircle01Icon}
        accent="#d98e63"
      />
      <StatCard
        label="Pending payouts"
        value={formatMoney(stats.pendingPayouts)}
        hint="awaiting fulfillment"
        icon={Wallet01Icon}
      />
      <StatCard
        label="Refunds"
        value={`${stats.refundsPercent}%`}
        icon={RefreshIcon}
        accent="#d98e63"
      />
    </div>
  );
}
