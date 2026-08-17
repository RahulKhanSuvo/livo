'use client';

import { PaginationState } from '@tanstack/react-table';
import { ReadonlyURLSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useMemo, useOptimistic, useTransition } from 'react';

interface UseServerPaginationParams {
  searchParams: ReadonlyURLSearchParams;
  defaultPage?: number;
  defaultLimit?: number;
}

const parsePositiveInteger = (value: string | null, fallbackValue: number): number => {
  if (!value) return fallbackValue;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallbackValue;
};

export const useServerPagination = ({
  searchParams,
  defaultPage = 1,
  defaultLimit = 2,
}: UseServerPaginationParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Calculate pagination state directly from searchParams
  const paginationFromUrl = useMemo<PaginationState>(() => {
    const page = parsePositiveInteger(searchParams.get('page'), defaultPage);
    const limit = parsePositiveInteger(searchParams.get('limit'), defaultLimit);

    return {
      pageIndex: page - 1,
      pageSize: limit,
    };
  }, [searchParams, defaultPage, defaultLimit]);

  // Optimistically apply the new page while navigation is pending; once the
  // transition completes it falls back to the URL-derived state automatically.
  const [paginationState, setOptimisticPage] = useOptimistic(
    paginationFromUrl,
    (_current, next: PaginationState) => next
  );

  const handlePaginationChange = useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      const nextState = typeof updater === 'function' ? updater(paginationState) : updater;

      const params = new URLSearchParams(window.location.search);
      params.set('page', String(nextState.pageIndex + 1));
      params.set('limit', String(nextState.pageSize));

      const nextUrl = `${pathname}?${params.toString()}`;

      startTransition(() => {
        setOptimisticPage(nextState);
        router.replace(nextUrl, { scroll: false });
      });
    },
    [pathname, router, paginationState, setOptimisticPage]
  );

  return {
    paginationState,
    handlePaginationChange,
    isPending,
  };
};
