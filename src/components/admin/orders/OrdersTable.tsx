'use client';

import { useState } from 'react';
import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderMetaRow } from './OrderMetaRow';
import { OrderProductCell } from './OrderProductCell';
import { OrderActions } from './OrderActions';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { formatMoney } from '@/components/admin/ui/format';
import type { OrderStatus } from '@/generated/prisma/client';

type OrdersTableProps = {
  orders: OrderRow[];
  onCancelOrder?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, currentStatus: OrderStatus) => void;
  onViewOrderDetails?: (orderId: string) => void;
  onPrintOrder?: (order: OrderRow) => void;
};

export function OrdersTable({
  orders,
  onCancelOrder,
  onUpdateStatus,
  onViewOrderDetails,
  onPrintOrder,
}: OrdersTableProps) {
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState<Record<string, boolean>>({});

  const allSelected = orders.length > 0 && selectedOrderIds.length === orders.length;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrderIds(orders.map((o) => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrderIds((prev) => [...prev, orderId]);
    } else {
      setSelectedOrderIds((prev) => prev.filter((id) => id !== orderId));
    }
  };

  const toggleExpand = (orderId: string) => {
    setExpandedOrderIds((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100/80 text-amber-700 border border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-900/60';
      case 'PROCESSING':
        return 'bg-emerald-100/80 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900/60';
      case 'SHIPPED':
        return 'bg-blue-100/80 text-blue-700 border border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900/60';
      case 'DELIVERED':
        return 'bg-green-100/80 text-green-700 border border-green-200/80 dark:bg-green-950/60 dark:text-green-300 dark:border-green-900/60';
      case 'CANCELLED':
        return 'bg-red-100/80 text-red-700 border border-red-200/80 dark:bg-red-950/60 dark:text-red-300 dark:border-red-900/60';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  const getStatusHelperText = (order: OrderRow) => {
    const targetDate = new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000);
    const dateFormatted = targetDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: '2-digit',
    });

    switch (order.status) {
      case 'PENDING':
        return `Please process before ${dateFormatted}`;
      case 'PROCESSING':
        return `Please Ship before ${dateFormatted}`;
      case 'SHIPPED':
        return `In transit`;
      case 'DELIVERED':
        return `Completed`;
      case 'CANCELLED':
        return `Order cancelled`;
      default:
        return null;
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Top Column Headers */}
      <div className="grid grid-cols-12 items-center px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50/90 dark:bg-zinc-900/80 text-xs font-semibold text-gray-700 dark:text-zinc-300 gap-4">
        <div className="col-span-5 flex items-center gap-3">
          <Checkbox
            checked={allSelected}
            onCheckedChange={(checked) => handleSelectAll(!!checked)}
            aria-label="Select all orders"
          />
          <span>Product</span>
        </div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Payment</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-1 text-right pr-2">Action</div>
      </div>

      {/* List of Order Cards */}
      {orders.map((order) => {
        const isSelected = selectedOrderIds.includes(order.id);
        const isExpanded = !!expandedOrderIds[order.id];
        const displayItems = isExpanded ? order.items : order.items.slice(0, 1);

        return (
          <div
            key={order.id}
            className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm overflow-hidden transition-all"
          >
            {/* Order Card Header */}
            <OrderMetaRow
              order={order}
              isSelected={isSelected}
              onSelectChange={(checked) => handleSelectOrder(order.id, checked)}
            />

            {/* Order Items */}
            <div className="divide-y divide-gray-100 dark:divide-zinc-800/60">
              {displayItems.map((item, index) => (
                <div
                  key={item.id || index}
                  className="grid grid-cols-12 items-start px-4 py-4 gap-4"
                >
                  {/* Product Cell */}
                  <div className="col-span-5">
                    <OrderProductCell
                      item={item}
                      onItemClick={() => onViewOrderDetails?.(order.id)}
                    />
                  </div>

                  {/* Price Cell */}
                  <div className="col-span-2 pt-1 font-bold text-sm text-gray-900 dark:text-zinc-100">
                    {formatMoney(item.totalPrice || order.total, 'EUR')}
                  </div>

                  {/* Payment Cell */}
                  <div className="col-span-2 pt-1 text-sm font-medium text-gray-700 dark:text-zinc-300 capitalize">
                    {order.paymentStatus === 'PAID'
                      ? 'Credit card'
                      : order.paymentStatus.toLowerCase()}
                  </div>

                  {/* Status Cell */}
                  <div className="col-span-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onUpdateStatus?.(order.id, order.status)}
                      className={`capitalize font-semibold text-xs px-3 py-1 rounded-md inline-block text-left transition-opacity hover:opacity-85 ${getStatusBadgeStyle(
                        order.status
                      )}`}
                    >
                      {order.status.toLowerCase()}
                    </button>

                    {getStatusHelperText(order) && (
                      <span className="text-[11px] font-semibold text-gray-800 dark:text-zinc-300 mt-1.5 block">
                        {getStatusHelperText(order)}
                      </span>
                    )}
                  </div>

                  {/* Action Cell (Rendered on first item row) */}
                  <div className="col-span-1 pt-0.5 flex justify-end">
                    {index === 0 && (
                      <OrderActions
                        order={order}
                        onCancelClick={onCancelOrder}
                        onPrintClick={onPrintOrder}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Show More / Show Less Footer */}
            {order.items.length > 1 && (
              <div className="px-4 py-2 border-t border-gray-100 dark:border-zinc-800/80 bg-gray-50/30 dark:bg-zinc-900/20">
                <button
                  type="button"
                  onClick={() => toggleExpand(order.id)}
                  className="text-xs font-semibold text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isExpanded ? 'Show less' : 'Show more'}</span>
                  <HugeiconsIcon
                    icon={isExpanded ? ArrowUp01Icon : ArrowDown01Icon}
                    className="size-3.5"
                  />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
