'use client';

import ProductCard from '../home/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { FurnitureQuery } from '@/actions/furniture/furniture.validation';

interface ProductListProps {
  queryKey: FurnitureQuery;
}

const ProductList = ({ queryKey }: ProductListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['products', queryKey],
    queryFn: () => getAllFurnitureAction(queryKey),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (data?.data?.products.length === 0) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center text-center">
        <h3 className="text-base font-medium text-neutral-900">No products found</h3>

        <p className="mt-1 text-sm text-neutral-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }
  console.log('product', data);
  const categorySlug = queryKey?.category || 'living-room';
  const subcategorySlug = queryKey?.subcategory || 'all';
  const basePath = `/shop/${categorySlug}/${subcategorySlug}`;

  return (
    <div className="grid flex-1 grid-cols-3 gap-3">
      {data?.data?.products.map((item) => (
        <ProductCard basePath={basePath} key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
