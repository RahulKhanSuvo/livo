'use client';
import { tableFeatures, useTable } from '@tanstack/react-table';
import type { ColumnDef, RowData } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

const features = tableFeatures({});

export type DataTableColumn<T> = ColumnDef<typeof features, T & RowData>;

export function DataTable<T>({
  data,
  columns,
  tableKey = 'data-table',
  emptyMessage = 'No records found.',
}: {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  tableKey?: string;
  emptyMessage?: string;
}) {
  const table = useTable({
    key: tableKey,
    features,
    columns: columns as Array<ColumnDef<typeof features, RowData>>,
    data: data as RowData[],
  });

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
            {table.getRowModel().rows.length === 0 ? (
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
    </div>
  );
}
