import { createColumnHelper } from '@tanstack/react-table';
import { OrderTableFeatures } from './order-table-features';
import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { OrderProductCell } from './OrderProductCell';
import { OrderActions } from './OrderActions';

const columnHelper = createColumnHelper<typeof OrderTableFeatures, OrderRow>();
export const OrderColumns = columnHelper.columns([
  columnHelper.display({
    id: 'select',
    header: '',
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
  columnHelper.display({
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.status.toLowerCase()}</span>;
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',

    cell: ({ row }) => {
      return <OrderActions order={row.original} />;
    },
  }),
]);
