import { ColumnDef, RowData, useTable } from '@tanstack/react-table';
import { OrderTableFeatures } from '../admin/orders/order-table-features';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DataTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<typeof OrderTableFeatures, TData>[];
}
const DataTable = <TData extends RowData>({ data, columns }: DataTableProps<TData>) => {
  const table = useTable(
    {
      features: OrderTableFeatures,
      data,
      columns,
    },
    (state) => state
  );
  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  <table.FlexRender header={header} />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell className="p-0" key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default DataTable;
