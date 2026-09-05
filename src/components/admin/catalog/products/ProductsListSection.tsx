import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import ProductPageContent from './ProductPageContnent';
import { adminValidationSchema } from '@/actions/furniture/furniture.validation';
import { AdminProductsQuery } from '@/queries/products.query';

export default async function ProductsListSection({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolved = await searchParams;
  const { page, limit, search, status, sort } = adminValidationSchema.parse(resolved);

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(AdminProductsQuery(page, limit, search, status, sort));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageContent page={page} limit={limit} search={search} status={status} sort={sort} />
    </HydrationBoundary>
  );
}
