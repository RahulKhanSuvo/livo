'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { DataTable } from '@/components/shared/data-table';
import { useServerPagination } from '@/hooks/useServerPagination';
import { getCustomersAction } from '@/actions/customer/getCustomersAction';
import { customerColumns } from './columns';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon } from '@hugeicons/core-free-icons';

export default function CustomersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(searchParams.get('search') ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { paginationState, handlePaginationChange, isPending } = useServerPagination({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;
  const search = searchParams.get('search') ?? '';

  const applyParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.set('page', '1');
      router.replace(`/admin/customers?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      applyParams({ search: searchInput });
    }, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput, applyParams]);

  const { data: result, isFetching } = useQuery({
    queryKey: ['customers', currentPage, currentLimit, search],
    queryFn: () => getCustomersAction({ page: currentPage, limit: currentLimit, search }),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-sm">
        <HugeiconsIcon
          icon={Search01Icon}
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search customers..."
          className="h-9 rounded-full pl-9"
        />
      </div>

      <DataTable
        isPending={isPending || isFetching}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: result?.data?.total || 0,
        }}
        columns={customerColumns()}
        data={result?.data?.customers || []}
        tableKey="customer-table"
        emptyMessage="No customers found."
      />
    </div>
  );
}
