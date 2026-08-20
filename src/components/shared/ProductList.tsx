'use client';

import ProductCard from '../home/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { FurnitureQuery } from '@/actions/furniture/furniture.validation';
import ProductPagination from './ProductPagination';
import { ProductSkeletonGrid } from './ProductSkeleton';
import { EmptyProducts } from './EmptyProducts';

interface ProductListProps {
  queryKey: FurnitureQuery;
}

const ProductList = ({ queryKey }: ProductListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading } = useQuery({
    queryKey: ['products', queryKey],
    queryFn: () => getAllFurnitureAction(queryKey),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });
  if (isLoading) {
    return <ProductSkeletonGrid count={queryKey.limit ?? 10} />;
  }
  if (data?.data?.products.length === 0) {
    return <EmptyProducts onReset={() => router.push(pathname)} />;
  }
  const basePath = '/product';

  return (
    <>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {data?.data?.products.map((item) => (
          <ProductCard basePath={basePath} key={item.id} product={item} />
        ))}
      </div>

      <ProductPagination
        total={data?.data?.total ?? 0}
        limit={queryKey.limit ?? 10}
        page={queryKey.page ?? 1}
      />
    </>
  );
};

export default ProductList;
