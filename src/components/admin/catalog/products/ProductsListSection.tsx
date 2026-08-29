import { dehydrate, HydrationBoundary, noop } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import { productsQuery } from '@/queries/products.query';
import ProductPageContent from './ProductPageContnent';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
export default async function ProductsListSection({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const query = furnitureQuerySchema.parse(searchParams);
  const { page, limit, search, status, brand, category } = query;

  const queryClient = getQueryClient();
  void queryClient
    .prefetchQuery(productsQuery({ page, limit, search, status, brand, category }))
    .catch(noop);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductPageContent />
    </HydrationBoundary>
  );
}
