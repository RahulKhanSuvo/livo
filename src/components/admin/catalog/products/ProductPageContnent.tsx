'use client';
import { getAllProducts } from '@/actions/products/getAllProducts';
import { useQuery } from '@tanstack/react-query';

function ProductPageContnent() {
  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  console.log('Product data', products);
  return <>{/*<DataTable columns={[]} data={products} keyField={(r) => r.id} />*/}</>;
}
export default ProductPageContnent;
