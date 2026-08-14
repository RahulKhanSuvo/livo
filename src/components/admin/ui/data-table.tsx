import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export function DataTable<T>({
  columns = [],
  data = [],
  keyField,
  className,
  emptyMessage = 'No records found.',
}: {
  columns: Column<T>[];
  data: T[];
  keyField: (row: T) => string;
  className?: string;
  emptyMessage?: string;
}) {
  return (
    <div
      className={cn('overflow-hidden rounded-2xl bg-white ring-1 ring-foreground/10', className)}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-foreground/8 bg-[#faf9f5]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:px-5',
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={keyField(row)}
                className="border-b border-foreground/5 transition-colors last:border-0 hover:bg-[#f6f5f1]/60"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-4 py-3 align-middle text-foreground/90 sm:px-5',
                      col.className
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
