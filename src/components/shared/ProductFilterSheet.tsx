'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { HugeiconsIcon } from '@hugeicons/react';
import { FilterFreeIcons } from '@hugeicons/core-free-icons';
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
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-neutral-300 text-neutral-900"
          >
            <HugeiconsIcon icon={FilterFreeIcons} size={16} strokeWidth={1.8} />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full p-0 sm:max-w-md">
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
