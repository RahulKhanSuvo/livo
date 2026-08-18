import { BadgePercentIcon, CheckmarkCircle01Icon, Clock01Icon } from '@hugeicons/core-free-icons';
import { StatCard } from '@/components/admin/ui/stat-card';
import { getCouponStatsAction } from '@/actions/coupon/getCouponStatsAction';

export default async function CouponsState() {
  const { data } = await getCouponStatsAction();
  const stats = data ?? { total: 0, active: 0, expired: 0 };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard label="Total Coupons" value={String(stats.total)} icon={BadgePercentIcon} />
      <StatCard
        label="Active"
        value={String(stats.active)}
        icon={CheckmarkCircle01Icon}
        accent="#d98e63"
      />
      <StatCard label="Expired" value={String(stats.expired)} icon={Clock01Icon} />
    </div>
  );
}
