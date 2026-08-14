import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import NewProductForm from '@/components/admin/catalog/products/NewProductForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

async function NewProductPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => getClassificationHierarchyAction(),
  });
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NewProductForm />
      </HydrationBoundary>
    </>
  );
}
export default NewProductPage;
