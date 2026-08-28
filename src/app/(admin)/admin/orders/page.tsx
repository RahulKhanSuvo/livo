import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import OrdersPage from '@/components/admin/orders/orders-page';
import { orderQuerySchema } from '@/actions/order/order.validation';
import { ordersQueryOptions } from '@/queries/orders.query';

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

  await queryClient.prefetchQuery(ordersQueryOptions(query));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OrdersPage query={query} />
    </HydrationBoundary>
  );
}
