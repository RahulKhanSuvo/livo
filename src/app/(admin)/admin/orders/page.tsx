import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import OrdersPage from '@/components/admin/orders/orders-page';
import { orderQuerySchema } from '@/actions/order/order.validation';
import { ordersQueryOptions } from '@/queries/orders.query';
import { Suspense } from 'react';
import { OrdersSkeleton } from '@/components/admin/ui/admin-skeletons';

export default async function OrdersRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;

  const query = orderQuerySchema.parse(params);

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(ordersQueryOptions(query)).catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrdersPage query={query} />
      </Suspense>
    </HydrationBoundary>
  );
}
