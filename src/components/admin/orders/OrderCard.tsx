'use client';

import { useState } from 'react';
import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { OrderMetaRow } from './OrderMetaRow';
import { OrderProductCell } from './OrderProductCell';
import { OrderStatusCell } from './OrderStatusCell';
import { OrderActions } from './OrderActions';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { formatMoney } from '@/components/admin/ui/format';
import type { OrderStatus } from '@/generated/prisma/client';

type OrderCardProps = {
  order: OrderRow;
  onCancelOrder?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, currentStatus: OrderStatus) => void;
};

export function OrderCard({ order, onCancelOrder, onUpdateStatus }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayItems = isExpanded ? order.items : order.items.slice(0, 1);

  return (
    <div className="rounded my-3 mx-1 sm:m-4 border border-gray-200 dark:border-zinc-800 dark:bg-zinc-900 transition-all">
      {/* Order Card Header */}
      <OrderMetaRow order={order} />

      {/* Order Items */}
      <div className="divide-y divide-gray-100 dark:divide-zinc-800/60">
        {displayItems.map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 items-start px-3 sm:px-4 py-4 gap-4"
          >
            {/* Product Cell */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-5">
              <OrderProductCell item={item} />
            </div>

            {/* Price Cell */}
            <div className="col-span-1 lg:col-span-2 pt-1 font-bold text-sm text-gray-900 dark:text-zinc-100">
              <span className="text-xs text-muted-foreground lg:hidden block mb-0.5 font-normal">
                Price:
              </span>
              {formatMoney(item.totalPrice || order.total, 'EUR')}
            </div>

            {/* Payment Cell */}
            <div className="col-span-1 lg:col-span-2 pt-1 text-sm font-medium text-gray-700 dark:text-zinc-300 capitalize">
              <span className="text-xs text-muted-foreground lg:hidden block mb-0.5 font-normal">
                Payment:
              </span>
              {order.paymentStatus === 'PAID' ? 'Credit card' : order.paymentStatus.toLowerCase()}
            </div>

            {/* Status Cell */}
            <OrderStatusCell order={order} onUpdateStatus={onUpdateStatus} />

            {/* Action Cell (Rendered on first item row) */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1 pt-0.5 flex justify-start sm:justify-end">
              {index === 0 && <OrderActions order={order} onCancelClick={onCancelOrder} />}
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Footer */}
      {order.items.length > 1 && (
        <div className="px-4 py-2">
          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-sm font-semibold text-gray-700 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
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
}
