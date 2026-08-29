import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { productsQuery } from '@/queries/products.query';
import ProductPageContent from './ProductPageContnent';

const parsePositive = (value: string | null | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export default async function ProductsListSection({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolved = await searchParams;

  const page = parsePositive(typeof resolved.page === 'string' ? resolved.page : undefined, 1);
  const limit = parsePositive(typeof resolved.limit === 'string' ? resolved.limit : undefined, 10);
  const search = typeof resolved.search === 'string' ? resolved.search : '';
  const status =
    resolved.status === 'ACTIVE' || resolved.status === 'DEACTIVATED'
      ? (resolved.status as 'ACTIVE' | 'DEACTIVATED')
      : undefined;
  const brand = typeof resolved.brand === 'string' ? resolved.brand : undefined;
  const stock = typeof resolved.stock === 'string' ? resolved.stock : undefined;
  const category = typeof resolved.category === 'string' ? resolved.category : undefined;

  const queryClient = getQueryClient();
  const params = { page, limit, search, status, brand, stock, category };

  // Kick off the fetch without awaiting — the pending promise is dehydrated
  // and streamed to the client, where useSuspenseQuery picks it up. The
  // queryClient is stable per request (React.cache), so the prefetched query
  // lands in the same cache useSuspenseQuery reads (no Server Action call
  // during render → no "Cannot update Router while rendering" warning).
  void queryClient.prefetchQuery(productsQuery(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageContent />
    </HydrationBoundary>
  );
}
