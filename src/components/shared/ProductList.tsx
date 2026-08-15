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

  return (
    <div className="grid flex-1 grid-cols-3 gap-3">
      {data.products.map((item) => (
        <ProductCard basePath="living-room/chair" key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductList;
