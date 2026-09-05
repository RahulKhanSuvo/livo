import { orderQuerySchema } from '@/actions/order/order.validation';
import { getAllOrdersAction } from '@/actions/order/getAllOrdersAction';
import { getOrderCountsAction } from '@/actions/order/getOrderCountsAction';
import { Suspense } from 'react';
import { OrdersSkeleton } from '@/components/admin/ui/admin-skeletons';
import { OrdersPageHeader } from '@/components/admin/orders/OrdersPageHeader';
import { OrdersTable } from '@/components/admin/orders/OrdersTable';

async function OrdersPageFetcher({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const result = orderQuerySchema.safeParse(params);
  const query = result.data || {};

  const [ordersRes, counts] = await Promise.all([
    getAllOrdersAction(query),
    getOrderCountsAction(),
  ]);

  const orders = ordersRes.data ?? [];

  return (
    <>
      <OrdersPageHeader
        activeStatus={query.status}
        counts={counts}
        search={query.search}
        sort={query.sort}
      />

      <OrdersTable orders={orders} />
    </>
  );
}

export default function OrdersRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <Suspense fallback={<OrdersSkeleton />}>
      <OrdersPageFetcher searchParams={searchParams} />
    </Suspense>
  );
}
