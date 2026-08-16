'use client';

import { useQuery } from '@tanstack/react-query';
import NewProductForm from './NewProductForm';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';
import type { ProductValidationType } from '@/actions/products/productValidation';

const EditProductForm = ({ id }: { id: string }) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product-by-id', id],
    queryFn: () => getProductByIdAction(id),
    select: (res) =>
      (res.data ?? undefined) as (Partial<ProductValidationType> & { id?: string }) | undefined,
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
