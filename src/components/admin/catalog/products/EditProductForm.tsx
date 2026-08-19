'use client';

import { useQuery } from '@tanstack/react-query';
import NewProductForm from './NewProductForm';
import { getProductByIdAction } from '@/actions/products/getProductByIdAction';
import type { ProductValidationType } from '@/actions/products/productValidation';
import type { ProductStatus } from '@/generated/prisma/client';

const EditProductForm = ({ id }: { id: string }) => {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product-by-id', id],
    queryFn: () => getProductByIdAction(id),
    select: (res) =>
      (res.data ?? undefined) as
        (Partial<ProductValidationType> & { id?: string; status?: ProductStatus }) | undefined,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <NewProductForm initialData={product} mode="edit" initialStatus={product?.status} />
    </div>
  );
};

export default EditProductForm;
