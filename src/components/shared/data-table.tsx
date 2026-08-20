import { tableFeatures, useTable, rowPaginationFeature } from '@tanstack/react-table';
import type { ColumnDef, PaginationState, RowData } from '@tanstack/react-table';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageIcon } from '@hugeicons/core-free-icons';
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
  const rows = table.getRowModel().rows;
  const isEmpty = !isPending && rows.length === 0;
  const hasFooter = !!pagination && pagination.totalRows > pagination.state.pageSize;

  const headerGroups = table.getHeaderGroups();

  return (
    <div className="space-y-5">
      {/* Desktop table */}
      <div className="hidden overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6 transition-shadow duration-300 md:block">
        <div className="overflow-x-auto">
          <Table className="w-full text-left text-sm">
            <TableHeader>
              {headerGroups.map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-border/70 bg-[#f7f6f1] hover:bg-[#f7f6f1] dark:bg-muted/40"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80"
                    >
                      {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="divide-y divide-border/60">
              {isPending ? (
                Array.from({ length: skeletonRows }).map((_, r) => (
                  <TableRow key={`skeleton-${r}`} className="hover:bg-transparent">
                    {columns.map((_, c) => (
                      <TableCell key={`skeleton-${r}-${c}`} className="px-5 py-4">
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : isEmpty ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={columns.length} className="px-5 py-16">
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className="grid size-12 place-items-center rounded-sm bg-[#4b6b56]/[0.08] text-[#4b6b56] ring-1 ring-inset ring-[#4b6b56]/15">
                        <HugeiconsIcon icon={PackageIcon} size={22} />
                      </span>
                      <p className="mt-3 font-serif text-lg text-foreground">Nothing here yet</p>
                      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{emptyMessage}</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="transition-colors hover:bg-[#4b6b56]/[0.035] hover:shadow-[inset_2px_0_0_0_#4b6b56]"
                  >
                    {row.getAllCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-5 py-4 align-middle text-sm text-foreground/90"
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

        {hasFooter && (
          <PaginationFooter
            pageIndex={pagination!.state.pageIndex}
            pageCount={table.getPageCount() || 1}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            onPageChange={(i) => table.setPageIndex(i)}
            onPreviousPage={() => table.previousPage()}
            onNextPage={() => table.nextPage()}
          />
        )}
      </div>

      {/* Mobile cards (auto-generated from column definitions) */}
      <div className="space-y-3 md:hidden">
        {isPending ? (
          Array.from({ length: skeletonRows }).map((_, r) => (
            <div
              key={`sk-${r}`}
              className="rounded-sm border border-border/60 bg-card p-4 shadow-[0_1px_2px_rgba(28,39,32,0.05)]"
            >
              <Skeleton className="mb-3 h-4 w-1/2" />
              <Skeleton className="mb-2 h-3 w-3/4" />
              <Skeleton className="mb-2 h-3 w-2/3" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border/70 bg-card px-5 py-14 text-center">
            <span className="grid size-12 place-items-center rounded-sm bg-[#4b6b56]/[0.08] text-[#4b6b56] ring-1 ring-inset ring-[#4b6b56]/15">
              <HugeiconsIcon icon={PackageIcon} size={22} />
            </span>
            <p className="mt-3 font-serif text-lg text-foreground">Nothing here yet</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">{emptyMessage}</p>
          </div>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="rounded-sm border border-border/60 bg-card p-4 shadow-[0_1px_2px_rgba(28,39,32,0.05)]"
            >
              {row.getAllCells().map((cell) => {
                const def = cell.column.columnDef;
                const label = typeof def.header === 'string' ? def.header : '';
                const content = <table.FlexRender cell={cell} />;

                if (!label) {
                  return (
                    <div
                      key={cell.id}
                      className="mt-2 flex justify-end border-t border-border/60 pt-3"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <div key={cell.id} className="flex items-start justify-between gap-3 py-1.5">
                    <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                      {label}
                    </span>
                    <span className="text-right text-sm text-foreground">{content}</span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>

      {hasFooter && (
        <div className="overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/[0.06] md:hidden">
          <PaginationFooter
            pageIndex={pagination!.state.pageIndex}
            pageCount={table.getPageCount() || 1}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            onPageChange={(i) => table.setPageIndex(i)}
            onPreviousPage={() => table.previousPage()}
            onNextPage={() => table.nextPage()}
          />
        </div>
      )}
    </div>
  );
}

export default DataTable;
