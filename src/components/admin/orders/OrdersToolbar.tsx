'use client';

import { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';

export type OrderSortOption = 'newest' | 'oldest' | 'total_desc' | 'total_asc';

interface OrdersToolbarProps {
  search?: string;
  sort?: OrderSortOption;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: OrderSortOption) => void;
}

export function OrdersToolbar({
  search = '',
  sort = 'newest',
  onSearchChange,
  onSortChange,
}: OrdersToolbarProps) {
  const [searchInput, setSearchInput] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sync internal state with external prop synchronously during render if changed externally
  if (prevSearch !== search) {
    setPrevSearch(search);
    setSearchInput(search);
  }

  // Debounced search handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearchChange(val);
    }, 350);
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
      {/* Search Input Box */}
      <div className="relative w-full sm:max-w-sm">
        <Input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Search by ID, name, status"
          className="h-10 pr-10 pl-4 rounded-lg bg-background border-border/80 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-blue-600 w-full"
        />
        <div className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground pointer-events-none">
          <HugeiconsIcon icon={Search01Icon} size={18} />
        </div>
      </div>

      {/* Right Controls: Sort Dropdown */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <Select value={sort} onValueChange={(val) => onSortChange(val as OrderSortOption)}>
          <SelectTrigger className="h-10 px-3 w-full sm:w-auto sm:min-w-44 bg-background border-border/80 text-sm rounded-lg shadow-xs font-normal">
            <span className="text-muted-foreground mr-1">Sort By:</span>
            <SelectValue placeholder="New Order" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="newest">New Order</SelectItem>
            <SelectItem value="oldest">Oldest Order</SelectItem>
            <SelectItem value="total_desc">Highest Amount</SelectItem>
            <SelectItem value="total_asc">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
