'use client';

import { useEffect } from 'react';
import ProductCard from '../home/ProductCard';
import { useQuery, keepPreviousData, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import ProductPagination from './ProductPagination';
import { ProductSkeletonGrid } from './ProductSkeleton';
import { EmptyProducts } from './EmptyProducts';
import { cn } from '@/lib/utils';

interface ProductListProps {
  category?: string;
  type?: string;
  subtype?: string;
}

const ProductList = ({ category, type, subtype }: ProductListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParameters = furnitureQuerySchema.parse({
    ...Object.fromEntries(searchParams.entries()),
    category,
    type,
    subtype,
  });

  const queryClient = useQueryClient();
  const page = queryParameters.page ?? 1;

  const { data, isLoading, isPlaceholderData } = useQuery({
    queryKey: ['products', queryParameters],
    queryFn: () => getAllFurnitureAction(queryParameters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 6,
    placeholderData: keepPreviousData,
  });

  // Preload the next page so a pagination click is already cached.
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['products', { ...queryParameters, page: page + 1 }],
      queryFn: () => getAllFurnitureAction({ ...queryParameters, page: page + 1 }),
      staleTime: 1000 * 60 * 5,
    });
  }, [page, queryClient, queryParameters]);

  if (isLoading) {
    return <ProductSkeletonGrid count={queryParameters.limit ?? 10} />;
  }

  if (data?.data?.products.length === 0) {
    return <EmptyProducts onReset={() => router.push(pathname)} />;
  }

  const basePath = '/product';

  return (
    <>
      <div
        className={cn(
          'grid flex-1 grid-cols-2 gap-2 transition-opacity sm:grid-cols-3 lg:grid-cols-4 sm:gap-3',
          isPlaceholderData && 'pointer-events-none opacity-60'
        )}
      >
        {data?.data?.products.map((item) => (
          <ProductCard basePath={basePath} key={item.id} product={item} />
        ))}
      </div>

      <ProductPagination
        total={data?.data?.total ?? 0}
        limit={queryParameters.limit ?? 10}
        page={page}
      />
    </>
  );
};

export default ProductList;
