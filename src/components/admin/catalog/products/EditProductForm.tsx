'use client';
import { useQuery } from '@tanstack/react-query';
import NewProductForm from './NewProductForm';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';

const EditProductForm = ({ id }: { id: string }) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product-by-id', id],
    queryFn: () => getProductByIdAction(id),
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NewProductForm initialData={product} mode="edit" />
    </div>
  );
};

export default EditProductForm;
