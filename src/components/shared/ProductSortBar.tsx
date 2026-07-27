'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { sortOptionsData } from '@/data/sort-options.data';
import { Check } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
export interface ProductSortBarProps {
  totalProducts?: number;
  onSortChange?: (sortId: string) => void;
  className?: string;
}

export const ProductSortBar: React.FC<ProductSortBarProps> = ({
  totalProducts = 13,
  onSortChange,
  className,
}) => {
  const [selectedSort, setSelectedSort] = useState<string>('best-selling');
  const [open, setOpen] = useState(false);

  const activeOption = sortOptionsData.find((opt) => opt.id === selectedSort) || sortOptionsData[2];

  const handleSelect = (sortId: string) => {
    setSelectedSort(sortId);
    setOpen(false);
    if (onSortChange) {
      onSortChange(sortId);
    }
  };

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between py-5 bg-white text-neutral-900',
        className
      )}
    >
      {/* Left: Product Count */}
      <span className="text-xs sm:text-sm font-normal text-neutral-800">
        {totalProducts} products
      </span>

      {/* Right: Sort By Dropdown */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 focus:outline-none transition-colors">
          <span className="font-light">Sort by:</span>
          <span className="font-medium text-neutral-900">{activeOption.label}</span>
        </PopoverTrigger>

        {/* Popover Card with Tooltip Arrow */}
        <PopoverContent
          align="end"
          sideOffset={8}
          className="w-56 rounded-xl border border-neutral-100 bg-white p-2 shadow-lg"
        >
          <div className="flex flex-col space-y-0.5">
            {sortOptionsData.map((option) => {
              const isSelected = option.id === selectedSort;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelect(option.id)}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-normal transition-colors',
                    isSelected
                      ? 'bg-neutral-100/80 font-medium text-neutral-900'
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
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
