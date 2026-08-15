'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { sortOptionsData } from '@/data/sort-options.data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface ProductSortBarProps {
  totalProducts?: number;
  className?: string;
}

export const ProductSortBar: React.FC<ProductSortBarProps> = ({ totalProducts = 0, className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get('sort') ?? 'createdAt:desc';

  const activeOption =
    sortOptionsData.find((option) => option.id === currentSort) ?? sortOptionsData[0];

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', sort);

    // Reset pagination when sorting changes
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);
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

        <Select value={currentSort} onValueChange={handleSortChange}>
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
            <SelectValue>{activeOption.label}</SelectValue>
          </SelectTrigger>

          <SelectContent
            align="end"
            sideOffset={8}
            className="w-52 rounded-xl border-neutral-100 p-1.5 shadow-lg"
          >
            {sortOptionsData.map((option) => (
              <SelectItem
                key={option.id}
                value={option.id}
                className={cn(
                  'cursor-pointer rounded-lg',
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
