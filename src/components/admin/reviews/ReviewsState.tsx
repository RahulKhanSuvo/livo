import {
  StarIcon,
  ChatIcon,
  CheckmarkCircle01Icon,
  ThumbsUpIcon,
} from '@hugeicons/core-free-icons';
import { StatCard } from '@/components/admin/ui/stat-card';
import { getReviewsStatsAction } from '@/actions/reviews/getReviewsStatsAction';

export default async function ReviewsState() {
  const { data } = await getReviewsStatsAction();
  const stats = data ?? { total: 0, averageRating: 0, fiveStar: 0, positiveRate: 0 };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard label="Average rating" value={`${stats.averageRating}`} icon={StarIcon} />
      <StatCard
        label="Total reviews"
        value={String(stats.total)}
        icon={ChatIcon}
        accent="#d98e63"
      />
      <StatCard
        label="5-star reviews"
        value={String(stats.fiveStar)}
        icon={CheckmarkCircle01Icon}
      />
      <StatCard
        label="Positive rate"
        value={`${stats.positiveRate}%`}
        hint="4★ and above"
        icon={ThumbsUpIcon}
        accent="#d98e63"
      />
    </div>
  );
}
