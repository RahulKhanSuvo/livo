import { ColumnDef, RowData, useTable } from '@tanstack/react-table';
import { OrderTableFeatures } from '../admin/orders/order-table-features';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface DataTableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<typeof OrderTableFeatures, TData>[];
}
const DataTable = ({ data, columns }: DataTableProps<RowData>) => {
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
      <Table>
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
                <TableCell key={cell.id}>
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
