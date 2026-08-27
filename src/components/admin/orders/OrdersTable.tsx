'use client';

import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { OrdersTableHeader } from './OrdersTableHeader';
import { OrderCard } from './OrderCard';
import { OrderEmptyState } from './OrderEmptyState';
import type { OrderStatus } from '@/generated/prisma/client';

type OrdersTableProps = {
  orders: OrderRow[];
  onCancelOrder?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, currentStatus: OrderStatus) => void;
  onPrintOrder?: (order: OrderRow) => void;
};

export function OrdersTable({
  orders,
  onCancelOrder,
  onUpdateStatus,
  onPrintOrder,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return <OrderEmptyState />;
  }

  return (
    <div className="w-full bg-white dark:bg-zinc-900">
      <OrdersTableHeader />
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onCancelOrder={onCancelOrder}
          onUpdateStatus={onUpdateStatus}
          onPrintOrder={onPrintOrder}
        />
      ))}
    </div>
  );
}
