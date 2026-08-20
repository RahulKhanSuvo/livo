'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable, type DataTableColumn } from '@/components/shared/data-table';
import { useServerPagination } from '@/hooks/useServerPagination';
import { getReviewsAction, type AdminReviewRow } from '@/actions/reviews/getReviewsAction';
import { deleteReviewAction } from '@/actions/reviews/deleteReviewAction';
import { Stars } from '@/components/admin/ui/badges';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { HugeiconsIcon } from '@hugeicons/react';
import { Search01Icon, MoreHorizontalIcon, DeleteIcon } from '@hugeicons/core-free-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function reviewColumns(onDelete: (id: string) => void): DataTableColumn<AdminReviewRow>[] {
  return [
    {
      accessorKey: 'product',
      header: 'Product',
      cell: ({ row }) => (
        <div className="max-w-xs">
          <p className="font-medium">{row.original.product}</p>
          {row.original.title && (
            <p className="truncate text-xs text-muted-foreground">{row.original.title}</p>
          )}
        </div>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => <span className="font-medium">{row.original.author}</span>,
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => <Stars rating={row.original.rating} />,
    },
    {
      accessorKey: 'comment',
      header: 'Review',
      cell: ({ row }) => <p className="max-w-md text-foreground/80">{row.original.comment}</p>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.date}</span>,
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Review actions">
                <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                variant="destructive"
                className="cursor-pointer"
                onSelect={() => onDelete(row.original.id)}
              >
                <HugeiconsIcon icon={DeleteIcon} size={15} className="mr-2" />
                Delete review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];
}

export default function ReviewsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

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
      router.replace(`/admin/reviews?${params.toString()}`, { scroll: false });
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
    queryKey: ['reviews', currentPage, currentLimit, search],
    queryFn: () => getReviewsAction({ page: currentPage, limit: currentLimit, search }),
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this review? This cannot be undone.')) return;
    const res = await deleteReviewAction({ id });
    if (res.success && res.data?.ok) {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    } else {
      alert(res.data?.message ?? res.message ?? 'Could not delete review.');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 rounded-sm bg-card p-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/[0.06]">
        <div className="relative w-full sm:max-w-sm">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search reviews, products, authors…"
            className="h-9 rounded-sm border-border/60 bg-card pl-9 shadow-[0_1px_2px_rgba(28,39,32,0.04)] focus-visible:ring-primary/30"
          />
        </div>
      </div>

      <DataTable
        isPending={isPending || isFetching}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: result?.data?.total || 0,
        }}
        columns={reviewColumns(handleDelete)}
        data={result?.data?.reviews || []}
        tableKey="reviews-table"
        emptyMessage="No reviews found."
      />
    </div>
  );
}
