'use client';

import { tableFeatures, useTable, rowPaginationFeature } from '@tanstack/react-table';
import type { ColumnDef, PaginationState, RowData } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Skeleton } from '../ui/skeleton';
import { PaginationFooter } from './pagination-footer';

// 1. Include rowPaginationFeature in tableFeatures
const features = tableFeatures({
  rowPaginationFeature,
});

export type DataTableColumn<T> = ColumnDef<typeof features, T & RowData>;

interface DataTableProps<T> {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  tableKey?: string;
  emptyMessage?: string;
  isPending?: boolean;
  // Clear, explicit pagination props (No need for meta)
  pagination?: {
    state: PaginationState;
    onPaginationChange: (
      updater: PaginationState | ((old: PaginationState) => PaginationState)
    ) => void;
    totalRows: number;
  };
}

export function DataTable<T>({
  data,
  columns,
  tableKey = 'data-table',
  emptyMessage = 'No records found.',
  isPending = false,
  pagination,
}: DataTableProps<T>) {
  const table = useTable({
    key: tableKey,
    features,
    columns: columns as Array<ColumnDef<typeof features, RowData>>,
    data: data as RowData[],
    manualPagination: true,
    rowCount: pagination?.totalRows,
    state: pagination
      ? {
          pagination: pagination.state,
        }
      : undefined,
    onPaginationChange: pagination?.onPaginationChange,
  });

  const skeletonRows = pagination?.state.pageSize ?? 5;

  return (
    <div className="rounded-lg bg-white ring-1 ring-foreground/10">
      <div className="overflow-x-auto">
        <Table className="w-full text-left text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-foreground/8 bg-[#faf9f5]">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-3 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:px-5"
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              Array.from({ length: skeletonRows }).map((_, r) => (
                <TableRow key={`skeleton-${r}`} className="border-b border-foreground/5">
                  {columns.map((_, c) => (
                    <TableCell key={`skeleton-${r}-${c}`} className="px-4 py-3 sm:px-5">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-foreground/5 transition-colors last:border-0 hover:bg-[#f6f5f1]/60"
                >
                  {row.getAllCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-3 align-middle text-foreground/90 sm:px-5"
                    >
                      <table.FlexRender cell={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && pagination.totalRows > pagination.state.pageSize && (
        <PaginationFooter
          pageIndex={pagination.state.pageIndex}
          pageCount={table.getPageCount() || 1}
          canPreviousPage={table.getCanPreviousPage()}
          canNextPage={table.getCanNextPage()}
          onPageChange={(i) => table.setPageIndex(i)}
          onPreviousPage={() => table.previousPage()}
          onNextPage={() => table.nextPage()}
        />
      )}
    </div>
  );
}
