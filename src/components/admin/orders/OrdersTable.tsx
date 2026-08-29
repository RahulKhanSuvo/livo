'use client';

import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { OrdersTableHeader } from './OrdersTableHeader';
import { OrderCard } from './OrderCard';
import { OrderEmptyState } from './OrderEmptyState';
import type { OrderStatus } from '@/generated/prisma/client';
import { useState } from 'react';
import { OrderCancelModal } from './order-cancel-modal';

type OrdersTableProps = {
  orders: OrderRow[];
  onUpdateStatus?: (orderId: string, currentStatus: OrderStatus) => void;
};

export function OrdersTable({ orders, onUpdateStatus }: OrdersTableProps) {
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  if (orders.length === 0) {
    return <OrderEmptyState />;
  }
  const handleCancelOrder = (id: string) => {
    setCancelOrderId(id);
    setCancelModalOpen(true);
  };
  return (
    <>
      <div className="w-full bg-white dark:bg-zinc-900">
        <OrdersTableHeader />
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onCancelOrder={handleCancelOrder}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
      <OrderCancelModal
        orderId={cancelOrderId}
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        onCancelled={() => {
          setCancelOrderId(null);
        }}
      />
    </>
  );
}
