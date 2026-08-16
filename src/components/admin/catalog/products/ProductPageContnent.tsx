'use client';
import { getAllProducts } from '@/actions/products/getAllProducts';
import { DataTable } from '@/components/shared/data-table';
import { useQuery } from '@tanstack/react-query';
import { productColumns } from './columns';

function ProductPageContnent() {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(1, 5),
  });
  console.log('product', products);
  return (
    <>
      <DataTable columns={productColumns} data={products?.products || []} key="product-table" />
    </>
  );
}
export default ProductPageContnent;
