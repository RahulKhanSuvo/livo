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
import { Search01Icon, Cancel01Icon, FilterIcon } from '@hugeicons/core-free-icons';

const ALL = 'all';

export function ProductsFilterBar({
  onNavigate,
}: {
  onNavigate?: (updates: Record<string, string>) => void;
}) {
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
      // Normalize: 'all'/empty -> '' so the receiver deletes the param.
      const normalized: Record<string, string> = {};
      for (const [key, value] of Object.entries(updates)) {
        normalized[key] = value === ALL ? '' : value;
      }

      if (onNavigate) {
        onNavigate(normalized);
        return;
      }

      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(normalized)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.set('page', '1');
      router.replace(`/admin/catalog/products?${params.toString()}`, {
        scroll: false,
      });
    },
    [router, onNavigate]
  );

  // Debounced push of the search term to the URL. Skip the initial mount
  // (searchInput === URL value) so we don't fire a redundant ?page=1 redirect.
  useEffect(() => {
    if (searchInput === searchValue) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyParams({ search: searchInput });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, searchValue, applyParams]);

  const hasActiveFilters =
    searchValue !== '' ||
    statusValue !== ALL ||
    brandValue !== ALL ||
    stockValue !== ALL ||
    categoryValue !== ALL;

  const activeFilters: { key: string; label: string; clearValue: string }[] = [];
  if (searchValue) activeFilters.push({ key: 'search', label: `"${searchValue}"`, clearValue: '' });
  if (statusValue !== ALL)
    activeFilters.push({
      key: 'status',
      label: statusValue === 'ACTIVE' ? 'Active' : 'Deactivated',
      clearValue: ALL,
    });
  if (categoryValue !== ALL) {
    const c = categoryOptions.find((o) => o.value === categoryValue);
    activeFilters.push({ key: 'category', label: c?.label ?? categoryValue, clearValue: ALL });
  }
  if (brandValue !== ALL) {
    const b = brandOptions.find((o) => o.value === brandValue);
    activeFilters.push({ key: 'brand', label: b?.label ?? brandValue, clearValue: ALL });
  }
  if (stockValue !== ALL)
    activeFilters.push({
      key: 'stock',
      label: stockValue === 'true' ? 'In stock' : 'Out of stock',
      clearValue: ALL,
    });

  const triggerClass =
    'h-9 rounded-sm border-border/60 bg-card text-sm shadow-[0_1px_2px_rgba(28,39,32,0.04)]';

  return (
    <div className="rounded-sm bg-card p-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products, brands…"
            className="h-9 rounded-sm border-border/60 bg-card pl-9 shadow-[0_1px_2px_rgba(28,39,32,0.04)] focus-visible:ring-primary/30"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select value={statusValue} onValueChange={(v) => applyParams({ status: v })}>
            <SelectTrigger className={`${triggerClass} w-37.5`}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All Statuses</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="DEACTIVATED">Deactivated</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryValue} onValueChange={(v) => applyParams({ category: v })}>
            <SelectTrigger className={`${triggerClass} w-40`}>
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
            <SelectTrigger className={`${triggerClass} w-37.5`}>
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
            <SelectTrigger className={`${triggerClass} w-35`}>
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
              variant="outline"
              className="h-9 rounded-sm gap-1.5"
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
              <HugeiconsIcon icon={Cancel01Icon} size={14} />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border/60 pt-3">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            <HugeiconsIcon icon={FilterIcon} size={13} />
            Active
          </span>
          {activeFilters.map((chip) => (
            <button
              key={chip.key}
              type="button"
              onClick={() => {
                if (chip.key === 'search') setSearchInput('');
                applyParams({ [chip.key]: chip.clearValue });
              }}
              className="group inline-flex items-center gap-1 rounded-sm bg-primary/8 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/15 transition-colors hover:bg-primary/[0.14]"
            >
              {chip.label}
              <HugeiconsIcon
                icon={Cancel01Icon}
                size={12}
                className="opacity-60 transition-opacity group-hover:opacity-100"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
