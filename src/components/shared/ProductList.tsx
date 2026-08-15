'use client';

import ProductCard from '../home/ProductCard';
import { useSuspenseQuery, type QueryKey } from '@tanstack/react-query';
import { getAllFurniture } from '@/actions/furniture/getAllFurniture';
import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';

interface ProductListProps {
  queryKey: QueryKey;
}

const ProductList = ({ queryKey }: ProductListProps) => {
  const { data } = useSuspenseQuery<GetAllFurnitureResponse>({
    queryKey,

    queryFn: () => {
      const [, params] = queryKey as [
        string,
        {
          search: string;
          sortBy: string;
          sortOrder: 'asc' | 'desc';
          page: number;
          limit: number;
        },
      ];

      return getAllFurniture(
        params.page,
        params.limit,
        params.search,
        params.sortOrder,
        params.sortBy as 'createdAt' | 'price'
      );
    },

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  if (!data.products.length) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center text-center">
        <h3 className="text-base font-medium text-neutral-900">No products found</h3>

        <p className="mt-1 text-sm text-neutral-500">
          Try adjusting your search or filter to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid flex-1 grid-cols-3 gap-3">
      {data.products.map((item) => (
        <ProductCard basePath="living-room/chair" key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
