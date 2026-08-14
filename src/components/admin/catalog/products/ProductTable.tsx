import { getAllProducts } from '@/actions/products/getAllProducts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProductPageContnent from './ProductPageContnent';

async function ProductTable() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductPageContnent />
      </HydrationBoundary>
    </>
  );
}
export default ProductTable;
