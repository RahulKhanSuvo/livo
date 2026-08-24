import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { productStatsQuery } from '@/queries/product-stats.query';
import ProductsState from './ProductsState';

// Server Component: prefetches the stats query and hydrates it so the client
// component renders immediately. Placed inside its own <Suspense> boundary in
// the route, so it streams independently from the product list.
export default async function ProductsStatsSection() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productStatsQuery());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsState />
    </HydrationBoundary>
  );
}
