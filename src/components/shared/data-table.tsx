'use client';

import {
  ColumnDef,
  RowData,
  tableFeatures,
  rowPaginationFeature,
  columnVisibilityFeature,
  createPaginatedRowModel,
  createCoreRowModel,
  PaginationState,
} from '@tanstack/react-table';
import { useTable } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaginationFooter } from './pagination-footer';

// ─── Stable feature set for this DataTable ────────────────────────────────────
// columnVisibilityFeature is required so Row gets .getVisibleCells()
const dataTableFeatures = tableFeatures({
  rowPaginationFeature,
  columnVisibilityFeature,
  paginatedRowModel: createPaginatedRowModel(),
  coreRowModel: createCoreRowModel(),
});

type DataTableTFeatures = typeof dataTableFeatures;

// ─── Public types consumed by columns files ────────────────────────────────────
export type DataTableColumn<TData extends RowData> = ColumnDef<DataTableTFeatures, TData>;

export interface DataTablePagination {
  state: PaginationState;
  onPaginationChange: (next: PaginationState) => void;
  totalRows: number;
}

export interface DataTableProps<TData extends RowData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  isPending?: boolean;
  pagination?: DataTablePagination;
  tableKey?: string;
  emptyMessage?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DataTable<TData extends RowData>({
  columns,
  data,
  isPending,
  pagination,
  emptyMessage = 'No records found.',
}: DataTableProps<TData>) {
  const pageCount = pagination
    ? Math.max(1, Math.ceil(pagination.totalRows / (pagination.state.pageSize || 10)))
    : 1;

  const table = useTable(
    {
      features: dataTableFeatures,
      columns,
      data,
      manualPagination: !!pagination,
      pageCount,
      state: {
        pagination: pagination?.state ?? { pageIndex: 0, pageSize: 10 },
      },
      onPaginationChange: pagination
        ? (updater) => {
            const next = typeof updater === 'function' ? updater(pagination.state) : updater;
            pagination.onPaginationChange(next);
          }
        : undefined,
    },
    // selector: subscribe only to pagination slice so non-pagination state
    // changes don't force a full re-render of this component
    (state) => ({ pagination: state.pagination })
  );

  return (
    <div className="w-full overflow-hidden rounded-md border border-border/80 bg-background shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <table.Subscribe selector={(s) => s.pagination}>
              {() =>
                table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="h-10 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                      >
                        {!header.isPlaceholder && <table.FlexRender header={header} />}
                      </TableHead>
                    ))}
                  </TableRow>
                ))
              }
            </table.Subscribe>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  Loading…
                </TableCell>
              </TableRow>
            ) : (
              <table.Subscribe selector={(s) => s.pagination}>
                {() => {
                  const rows = table.getRowModel().rows;
                  if (!rows.length) {
                    return (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center text-sm text-muted-foreground"
                        >
                          {emptyMessage}
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-muted/40 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3 text-sm">
                          <table.FlexRender cell={cell} />
                        </TableCell>
                      ))}
                    </TableRow>
                  ));
                }}
              </table.Subscribe>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <table.Subscribe selector={(s) => s.pagination}>
          {(pag) => (
            <PaginationFooter
              pageIndex={pag.pageIndex}
              pageCount={pageCount}
              canPreviousPage={pag.pageIndex > 0}
              canNextPage={pag.pageIndex + 1 < pageCount}
              onPageChange={(idx) => pagination.onPaginationChange({ ...pag, pageIndex: idx })}
              onPreviousPage={() =>
                pagination.onPaginationChange({
                  ...pag,
                  pageIndex: Math.max(pag.pageIndex - 1, 0),
                })
              }
              onNextPage={() =>
                pagination.onPaginationChange({
                  ...pag,
                  pageIndex: Math.min(pag.pageIndex + 1, pageCount - 1),
                })
              }
            />
          )}
        </table.Subscribe>
      )}
    </div>
  );
}
