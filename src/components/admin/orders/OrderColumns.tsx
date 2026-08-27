import { createColumnHelper } from '@tanstack/react-table';
import { OrderTableFeatures } from './order-table-features';
import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { Input } from '@/components/ui/input';
import { OrderProductCell } from './OrderProductCell';

const columnHelper = createColumnHelper<typeof OrderTableFeatures, OrderRow>();
export const columns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: '',
    cell: ({ row }) => {
      return <Input type="checkbox" aria-label={`Select order ${row.original.orderNumber}`} />;
    },
  }),

  columnHelper.display({
    id: 'product',
    header: 'Product',

    cell: ({ row }) => {
      const order = row.original;

      return <OrderProductCell order={order} />;
    },
  }),

  columnHelper.display({
    id: 'price',
    header: 'Price',

    cell: ({ row }) => {
      return <span className="font-medium">${row.original.total.toFixed(2)}</span>;
    },
  }),

  columnHelper.display({
    id: 'payment',
    header: 'Payment',

    cell: ({ row }) => {
      return <span className="capitalize">{row.original.paymentStatus.toLowerCase()}</span>;
    },
  }),
]);
