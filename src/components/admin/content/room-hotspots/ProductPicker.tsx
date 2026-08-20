'use client';

import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

function useDebounced<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export function ProductPicker({
  value,
  displayName,
  onSelect,
  autoFocus,
}: {
  value: string | null;
  displayName: string;
  onSelect: (id: string | null, name: string) => void;
  autoFocus?: boolean;
}) {
  const [search, setSearch] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const debounced = useDebounced(search);

  const { data, isFetching } = useQuery({
    queryKey: ['product-search', debounced],
    queryFn: () =>
      getAllFurnitureAction({
        search: debounced,
        limit: 20,
        page: 1,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
    enabled: open,
    staleTime: 30_000,
  });

  const products = data?.data?.products ?? [];

  return (
    <div className="relative">
      <Input
        value={open ? search : displayName}
        placeholder="Search products…"
        autoFocus={autoFocus}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onSelect(null, '');
            setSearch('');
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear
        </button>
      )}
      {open && (
        <div className="absolute z-50 mt-1 max-h-64 w-full overflow-auto rounded-sm border bg-popover p-1 shadow-xl">
          {isFetching && <p className="px-3 py-2 text-xs text-muted-foreground">Searching…</p>}
          {!isFetching && products.length === 0 && (
            <p className="px-3 py-2 text-xs text-muted-foreground">No products found</p>
          )}
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              className="flex w-full items-center justify-between gap-2 rounded px-3 py-2 text-left text-sm hover:bg-accent"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onSelect(p.id, p.name);
                setOpen(false);
                setSearch('');
              }}
            >
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
