import { getAllBrandAction } from '@/actions/brand/getAllBrand';
import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import { getAllMaterialAction } from '@/actions/material/getAllMaterial';
import NewProductForm from '@/components/admin/catalog/products/NewProductForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

async function NewProductPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => getClassificationHierarchyAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['material'],
    queryFn: () => getAllMaterialAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['brand'],
    queryFn: () => getAllBrandAction(),
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
