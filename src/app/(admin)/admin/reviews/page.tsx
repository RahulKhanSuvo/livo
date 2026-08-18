import { PageHeader } from '@/components/admin/ui/page-header';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ReviewsState from '@/components/admin/reviews/ReviewsState';
import ReviewsContent from '@/components/admin/reviews/ReviewsContent';
import { getReviewsAction } from '@/actions/reviews/getReviewsAction';

export default async function ReviewsRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;
  const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['reviews', page, limit, search],
    queryFn: () => getReviewsAction({ page, limit, search }),
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reviews"
        description="Customer feedback on delivered orders — browse and moderate."
      />
      <ReviewsState />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ReviewsContent />
      </HydrationBoundary>
    </div>
  );
}
