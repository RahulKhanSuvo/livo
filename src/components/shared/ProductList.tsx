'use client';

import ProductCard from '../home/ProductCard';
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
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

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['products', queryParameters],
    queryFn: ({ pageParam }) => getAllFurnitureAction({ ...queryParameters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const d = lastPage.data;
      return d?.hasNextPage ? (d.page ?? 1) + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60 * 6,
  });

  const products = data?.pages.flatMap((p) => p.data?.products ?? []) ?? [];
  const total = data?.pages[0]?.data?.total ?? 0;

  if (isLoading) {
    return <ProductSkeletonGrid count={queryParameters.limit ?? 10} />;
  }

  if (products.length === 0) {
    return <EmptyProducts onReset={() => router.push(pathname)} />;
  }

  const basePath = '/product';

  return (
    <>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-3">
        {products.map((item) => (
          <ProductCard basePath={basePath} key={item.id} product={item} />
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-10 flex flex-col items-center gap-3">
          <span className="text-xs text-neutral-400">
            Showing {products.length} of {total}
          </span>
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="rounded-full border border-neutral-300 px-8 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-700 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isFetchingNextPage ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}
    </>
  );
};

export default ProductList;
