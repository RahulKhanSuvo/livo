'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getFilterOptionsAction } from '@/actions/furniture/getFilterOptions';
import { getClassificationHierarchyAction } from '@/actions/category/category_action';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';

const ALL = 'all';

export function ProductsFilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get('search') ?? '';
  const statusValue = searchParams.get('status') ?? ALL;
  const brandValue = searchParams.get('brand') ?? ALL;
  const stockValue = searchParams.get('stock') ?? ALL;
  const categoryValue = searchParams.get('category') ?? ALL;

  const [searchInput, setSearchInput] = useState(searchValue);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: filterResult } = useQuery({
    queryKey: ['product-filter-options'],
    queryFn: () => getFilterOptionsAction({}),
    staleTime: Infinity,
  });

  const { data: categoryResult } = useQuery({
    queryKey: ['product-admin-categories'],
    queryFn: () => getClassificationHierarchyAction(),
    staleTime: Infinity,
  });

  const brandOptions =
    filterResult?.data
      ?.find((g) => g.id === 'brand')
      ?.options.map((o) => ({ value: o.id, label: o.label })) ?? [];

  const categoryOptions =
    categoryResult?.data?.map((c) => ({ value: c.slug, label: c.name })) ?? [];

  const applyParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(updates)) {
        if (value && value !== ALL) params.set(key, value);
        else params.delete(key);
      }
      params.set('page', '1');
      router.replace(`/admin/catalog/products?${params.toString()}`, {
        scroll: false,
      });
    },
    [router]
  );

  // Debounced push of the search term to the URL.
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyParams({ search: searchInput });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, applyParams]);

  const hasActiveFilters =
    searchValue !== '' ||
    statusValue !== ALL ||
    brandValue !== ALL ||
    stockValue !== ALL ||
    categoryValue !== ALL;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-55 flex-1">
        <HugeiconsIcon
          icon={Search01Icon}
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="h-9 rounded-full pl-9"
        />
      </div>

      <Select value={statusValue} onValueChange={(v) => applyParams({ status: v })}>
        <SelectTrigger className="h-9 w-[160px] rounded-full">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Statuses</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
        </SelectContent>
      </Select>

      <Select value={categoryValue} onValueChange={(v) => applyParams({ category: v })}>
        <SelectTrigger className="h-9 w-[170px] rounded-full">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Categories</SelectItem>
          {categoryOptions.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={brandValue} onValueChange={(v) => applyParams({ brand: v })}>
        <SelectTrigger className="h-9 w-[160px] rounded-full">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Brands</SelectItem>
          {brandOptions.map((b) => (
            <SelectItem key={b.value} value={b.value}>
              {b.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={stockValue} onValueChange={(v) => applyParams({ stock: v })}>
        <SelectTrigger className="h-9 w-[150px] rounded-full">
          <SelectValue placeholder="Stock" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>All Stock</SelectItem>
          <SelectItem value="true">In Stock</SelectItem>
          <SelectItem value="false">Out of Stock</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="h-9 rounded-full"
          onClick={() => {
            setSearchInput('');
            applyParams({
              search: '',
              status: ALL,
              brand: ALL,
              stock: ALL,
              category: ALL,
            });
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
}
