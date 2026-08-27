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
    <div className="flex flex-col gap-2 w-full max-w-35 ml-auto">
      <Button type="button" size="sm" onClick={handlePrint}>
        <HugeiconsIcon icon={PrinterIcon} className="size-3.5" />
        <span>Print Label</span>
      </Button>

      {isCancelable ? (
        <Button type="button" onClick={handleCancel} variant={'destructive'}>
          Cancel Order
        </Button>
      ) : (
        <Button type="button" disabled variant={'outline'}>
          Cancel Order
        </Button>
      )}
    </div>
  );
}
