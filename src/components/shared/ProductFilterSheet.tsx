'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { HugeiconsIcon } from '@hugeicons/react';
import { FilterHorizontalIcon } from '@hugeicons/core-free-icons';
import ProductFilterSidebar from './ProductFilterSidebar';

export const ProductFilterSheet = ({
  category,
  subcategory,
}: {
  category?: string;
  subcategory?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="flex items-center gap-1 cursor-pointer">
          <HugeiconsIcon icon={FilterHorizontalIcon} size={16} strokeWidth={1.8} />
          Filters
        </SheetTrigger>
        <SheetContent side="right" className="w-full p-0 sm:max-w-md">
          <SheetHeader className="border-b border-neutral-200">
            <SheetTitle>Filter</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto">
            <ProductFilterSidebar category={category} subcategory={subcategory} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProductFilterSheet;
