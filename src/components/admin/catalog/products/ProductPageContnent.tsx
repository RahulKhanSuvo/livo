'use client';
import { getAllProducts } from '@/actions/products/getAllProducts';
import { DataTable } from '@/components/shared/data-table';
import { useQuery } from '@tanstack/react-query';
import { productColumns } from './columns';

function ProductPageContent({ page, limit }: { page: number; limit: number }) {
  const { data: products } = useQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getAllProducts(page, limit),
  });
  console.log('product', products);
  return (
    <>
      <DataTable columns={productColumns} data={products?.products || []} key="product-table" />
    </>
  );
}
export default ProductPageContent;
