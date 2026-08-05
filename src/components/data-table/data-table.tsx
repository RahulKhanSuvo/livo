'use client';
import { tableFeatures, useTable } from '@tanstack/react-table';
import type { ColumnDef, RowData } from '@tanstack/react-table';

const features = tableFeatures({});

export type DataTableColumn<T> = ColumnDef<typeof features, T & RowData>;

export function DataTable<T>({
  data,
  columns,
  key = 'data-table',
  emptyMessage = 'No records found.',
}: {
  data: T[];
  columns: Array<DataTableColumn<T>>;
  key?: string;
  emptyMessage?: string;
}) {
  const table = useTable({
    key,
    features,
    columns: columns as Array<ColumnDef<typeof features, RowData>>,
    data: data as RowData[],
  });

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-foreground/8 bg-[#faf9f5]">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:px-5"
                  >
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-foreground/5 transition-colors last:border-0 hover:bg-[#f6f5f1]/60"
                >
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3 align-middle text-foreground/90 sm:px-5">
                      <table.FlexRender cell={cell} />
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
