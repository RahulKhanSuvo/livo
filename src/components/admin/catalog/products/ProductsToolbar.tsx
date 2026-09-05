'use client';

import { useState, useEffect, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, Loading03Icon } from '@hugeicons/core-free-icons';

export type ProductSortOption = 'newest' | 'oldest' | 'price_desc' | 'price_asc';
export type ProductStatusOption = 'all' | 'ACTIVE' | 'DEACTIVATED';

interface ProductsToolbarProps {
  search?: string;
  status?: string;
  sort?: string;
}

export function ProductsToolbar({
  search = '',
  status = 'all',
  sort = 'newest',
}: ProductsToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(search);
  const [prevSearch, setPrevSearch] = useState(search);

  if (prevSearch !== search) {
    setPrevSearch(search);
    setSearchTerm(search);
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm === search) return;

      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set('search', searchTerm);
      } else {
        params.delete('search');
      }
      params.set('page', '1');

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, pathname, searchParams, router, search]);

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === 'newest') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }
    params.set('page', '1');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handleStatusChange = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus === 'all') {
      params.delete('status');
    } else {
      params.set('status', newStatus);
    }
    params.set('page', '1');

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1 pb-4">
      <div className="relative w-full sm:max-w-sm">
        <Input
          name="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="h-10 pl-10 pr-4 rounded-lg bg-background border-border/80 text-sm shadow-xs focus-visible:ring-1 focus-visible:ring-blue-600 w-full"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {isPending ? (
            <HugeiconsIcon
              icon={Loading03Icon}
              size={18}
              className="animate-spin text-muted-foreground"
            />
          ) : (
            <HugeiconsIcon icon={Search01Icon} size={18} />
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <Select value={status || 'all'} onValueChange={handleStatusChange}>
          <SelectTrigger className="h-10 px-3 w-full sm:w-auto sm:min-w-32 bg-background border-border/80 text-sm rounded-lg shadow-xs font-normal">
            <span className="text-muted-foreground mr-1">Status:</span>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={handleSortChange}>
          <SelectTrigger className="h-10 px-3 w-full sm:w-auto sm:min-w-44 bg-background border-border/80 text-sm rounded-lg shadow-xs font-normal">
            <span className="text-muted-foreground mr-1">Sort By:</span>
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price_desc">Highest Price</SelectItem>
            <SelectItem value="price_asc">Lowest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
