'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { sortOptionsData } from '@/data/sort-options.data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ProductSortBarProps {
  className?: string;
  category?: string;
  type?: string;
  subtype?: string;
}

export const ProductSortBar: React.FC<ProductSortBarProps> = ({
  className,
  category,
  type,
  subtype,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Build the SAME query parameters ProductList uses (including the
  // category/type derived from the URL slug) so the cache key matches and
  // we can read the correct total.
  const queryParameters = furnitureQuerySchema.parse({
    ...Object.fromEntries(searchParams.entries()),
    category,
    type,
    subtype,
  });

  const { data } = useInfiniteQuery({
    queryKey: ['products', queryParameters],
    queryFn: ({ pageParam }) => getAllFurnitureAction({ ...queryParameters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: () => undefined,
    staleTime: 1000 * 60 * 5,
  });

  const totalProducts = data?.pages?.[0]?.data?.total ?? 0;

  const currentSort = searchParams.get('sortBy') ?? 'createdAt';
  const currentSortOrder = searchParams.get('sortOrder') ?? 'desc';

  const activeOption =
    sortOptionsData.find(
      (option) => option.sort === currentSort && option.sortOrder === currentSortOrder
    ) ?? sortOptionsData[0];

  const handleSortChange = (optionId: string) => {
    const selectedOption = sortOptionsData.find((option) => option.id === optionId);

    if (!selectedOption) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set('sortBy', selectedOption.sort);
    params.set('sortOrder', selectedOption.sortOrder);

    // Sorting changes the result set.
    // Always reset pagination.
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between',
        'bg-white py-5 text-neutral-900',
        className
      )}
    >
      {/* Product count */}
      <span className="text-xs font-normal text-neutral-800 sm:text-sm">
        {totalProducts} products
      </span>

      {/* Sort */}
      <div className="flex items-center">
        <span className="text-xs font-light text-neutral-500 sm:text-sm">Sort by:</span>

        <Select value={activeOption.id} onValueChange={handleSortChange}>
          <SelectTrigger
            className={cn(
              'h-auto w-auto border-0 bg-transparent',
              'px-1.5 py-0',
              'text-xs font-medium text-neutral-900 sm:text-sm',
              'shadow-none',
              'hover:text-neutral-600',
              'focus:ring-0 focus:ring-offset-0',
              'focus-visible:ring-0 focus-visible:ring-offset-0'
            )}
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            align="end"
            sideOffset={8}
            className="w-52 rounded-sm border-neutral-100 p-1.5 shadow-lg"
          >
            {sortOptionsData.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className={cn(
                  'cursor-pointer rounded-sm',
                  'px-3 py-2',
                  'text-xs sm:text-sm',
                  'focus:bg-neutral-100 focus:text-neutral-900'
                )}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ProductSortBar;
