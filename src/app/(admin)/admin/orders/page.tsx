import { OrdersPage } from '@/components/admin/orders/orders-page';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { getAllOrdersAction } from '@/actions/order/getAllOrdersAction';

export default async function OrdersRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolvedParams = await searchParams;
  const status = typeof resolvedParams.status === 'string' ? resolvedParams.status : 'ALL';
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['orders', status, page, limit],
    queryFn: () => getAllOrdersAction({ page, limit, status }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersPage />
    </HydrationBoundary>
  );
}
