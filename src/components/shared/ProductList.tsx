'use client';

import ProductCard from '../home/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import ProductPagination from './ProductPagination';
import { ProductSkeletonGrid } from './ProductSkeleton';
import { EmptyProducts } from './EmptyProducts';

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

  const { data, isLoading } = useQuery({
    queryKey: ['products', queryParameters],
    queryFn: () => getAllFurnitureAction(queryParameters),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 60 * 6,
  });

  if (isLoading) {
    return <ProductSkeletonGrid count={queryParameters.limit ?? 10} />;
  }

  if (data?.data?.products.length === 0) {
    return <EmptyProducts onReset={() => router.push(pathname)} />;
  }

  const basePath = '/product';

  return (
    <>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3">
        {data?.data?.products.map((item) => (
          <ProductCard basePath={basePath} key={item.id} product={item} />
        ))}
      </div>

      <ProductPagination
        total={data?.data?.total ?? 0}
        limit={queryParameters.limit ?? 10}
        page={queryParameters.page ?? 1}
      />
    </>
  );
};

export default ProductList;
