'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { OrderQuery } from '@/actions/order/order.validation';
import { ordersQueryOptions } from '@/queries/orders.query';
import { OrdersTable } from './OrdersTable';
import { OrderCancelModal } from './order-cancel-modal';
import { OrderStatusModal } from './order-status-modal';
import type { OrderStatus } from '@/generated/prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

const OrdersPage = ({ query }: { query: OrderQuery }) => {
  const { data: response, isLoading } = useQuery(ordersQueryOptions(query));

  // Modal states
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);

  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusOrderId, setStatusOrderId] = useState<string | null>(null);
  const [statusCurrent, setStatusCurrent] = useState<OrderStatus | undefined>(undefined);

  const orders = response?.data ?? [];

  const handleCancelOrder = (id: string) => {
    setCancelOrderId(id);
    setCancelModalOpen(true);
  };

  const handleUpdateStatus = (id: string, currentStatus: OrderStatus) => {
    setStatusOrderId(id);
    setStatusCurrent(currentStatus);
    setStatusModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-44 w-full rounded-xl" />
        <Skeleton className="h-44 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <OrdersTable
          orders={orders}
          onCancelOrder={handleCancelOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>

      {/* Modals */}
      <OrderCancelModal
        orderId={cancelOrderId}
        open={cancelModalOpen}
        onOpenChange={setCancelModalOpen}
        onCancelled={() => {
          setCancelOrderId(null);
        }}
      />

      <OrderStatusModal
        orderId={statusOrderId}
        currentStatus={statusCurrent}
        open={statusModalOpen}
        onOpenChange={setStatusModalOpen}
        onUpdated={() => {
          setStatusOrderId(null);
        }}
      />
    </>
  );
};

export default OrdersPage;
