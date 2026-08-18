import CouponsState from '@/components/admin/promotions/CouponsState';
import { PageHeader } from '@/components/admin/ui/page-header';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import CouponsPageContent from '@/components/admin/promotions/CouponsPageContnent';
import { getCouponsAction } from '@/actions/coupon/getCouponsAction';

export default async function CouponsRoute({
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
    queryKey: ['coupons', page, limit, search],
    queryFn: () => getCouponsAction({ page, limit, search }),
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Coupons" description="Create and manage discount codes for your store." />
      <CouponsState />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CouponsPageContent />
      </HydrationBoundary>
    </div>
  );
}
