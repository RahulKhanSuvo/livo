'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Edit02Icon } from '@hugeicons/core-free-icons';
import type { OrderStatus } from '@/generated/prisma/client';
import type { OrderRow } from '@/actions/order/getAllOrdersAction';

type OrderStatusCellProps = {
  order: OrderRow;
  onUpdateStatus?: (orderId: string, currentStatus: OrderStatus) => void;
};

export function getStatusBadgeStyle(status: OrderStatus) {
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
}

export function getStatusHelperText(order: OrderRow) {
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
}

export function OrderStatusCell({ order, onUpdateStatus }: OrderStatusCellProps) {
  const helperText = getStatusHelperText(order);

  return (
    <div className="col-span-2 pt-1">
      <button
        type="button"
        onClick={() => onUpdateStatus?.(order.id, order.status)}
        className={`group relative capitalize font-semibold text-xs px-3 py-1 rounded-md inline-flex items-center gap-1.5 transition-all cursor-pointer hover:shadow-xs hover:opacity-90 ${getStatusBadgeStyle(
          order.status
        )}`}
      >
        <span>{order.status.toLowerCase()}</span>
        <HugeiconsIcon
          icon={Edit02Icon}
          className="size-3 opacity-0 -mr-1.5 group-hover:opacity-100 group-hover:mr-0 transition-all duration-200 shrink-0"
        />
      </button>

      {helperText && (
        <span className="text-[11px] font-semibold text-gray-800 dark:text-zinc-300 mt-1.5 block">
          {helperText}
        </span>
      )}
    </div>
  );
}
