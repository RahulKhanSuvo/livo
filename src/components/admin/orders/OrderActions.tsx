'use client';

import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { PrinterIcon } from '@hugeicons/core-free-icons';

type OrderActionsProps = {
  order: OrderRow;
  onCancelClick?: (orderId: string) => void;
  onPrintClick?: (order: OrderRow) => void;
};

export function OrderActions({ order, onCancelClick, onPrintClick }: OrderActionsProps) {
  const isCancelable =
    order.status === 'PENDING' || order.status === 'CONFIRMED' || order.status === 'PROCESSING';

  const handlePrint = () => {
    if (onPrintClick) {
      onPrintClick(order);
    } else {
      window.print();
    }
  };

  const handleCancel = () => {
    if (isCancelable && onCancelClick) {
      onCancelClick(order.id);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full max-w-[140px] ml-auto">
      <Button
        type="button"
        size="sm"
        onClick={handlePrint}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs h-8 rounded-lg flex items-center justify-center gap-1.5 w-full shadow-sm transition-colors"
      >
        <HugeiconsIcon icon={PrinterIcon} className="size-3.5" />
        <span>Print Label</span>
      </Button>

      {isCancelable ? (
        <button
          type="button"
          onClick={handleCancel}
          className="border border-red-400 dark:border-red-800/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 font-semibold text-xs py-1.5 px-3 rounded-lg w-full text-center transition-colors"
        >
          Cancel Order
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="bg-gray-100 dark:bg-zinc-800/80 text-gray-400 dark:text-zinc-500 border border-gray-200 dark:border-zinc-700/60 cursor-not-allowed font-semibold text-xs py-1.5 px-3 rounded-lg w-full text-center"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
}
