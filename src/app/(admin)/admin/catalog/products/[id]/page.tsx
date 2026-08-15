import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';
import EditProductForm from '@/components/admin/catalog/products/EditProductForm';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

const EditProductPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['category'],
    queryFn: () => getClassificationHierarchyAction(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['product-by-id', id],
    queryFn: () => getProductByIdAction(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EditProductForm id={id} />
    </HydrationBoundary>
  );
};

export default EditProductPage;
