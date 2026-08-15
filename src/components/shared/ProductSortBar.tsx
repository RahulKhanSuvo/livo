'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { sortOptionsData } from '@/data/sort-options.data';
import { Check } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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

  const [open, setOpen] = React.useState(false);

  const handleSelect = (sortId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', sortId);

    // When sorting changes, go back to page 1
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`);

    setOpen(false);
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between bg-white py-5 text-neutral-900',
        className
      )}
    >
      {/* Product count */}
      <span className="text-xs font-normal text-neutral-800 sm:text-sm">
        {totalProducts} products
      </span>

      {/* Sort */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex items-center gap-1.5 text-xs text-neutral-600 transition-colors hover:text-neutral-900 focus:outline-none sm:text-sm">
          <span className="font-light">Sort by:</span>

          <span className="font-medium text-neutral-900">{activeOption.label}</span>
        </PopoverTrigger>

        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-56 rounded-xl border border-neutral-100 bg-white p-2 shadow-lg"
        >
          <div className="flex flex-col space-y-0.5">
            {sortOptionsData.map((option) => {
              const isSelected = option.id === currentSort;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors',
                    isSelected
                      ? 'bg-neutral-100/80 font-medium text-neutral-900'
                      : 'font-normal text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                  )}
                >
                  <span>{option.label}</span>

                  {isSelected && (
                    <HugeiconsIcon icon={Check} className="h-3.5 w-3.5 text-neutral-800" />
                  )}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ProductSortBar;
