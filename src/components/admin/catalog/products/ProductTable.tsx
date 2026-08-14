import { getAllProducts } from '@/actions/products/getAllProducts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProductPageContnent from './ProductPageContnent';

async function ProductTable() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(1, 5),
  });
  console.log();
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductPageContnent />
      </HydrationBoundary>
    </>
  );
}
export default ProductTable;
