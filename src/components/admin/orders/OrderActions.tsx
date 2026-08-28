'use client';

import { OrderRow } from '@/actions/order/getAllOrdersAction';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { PrinterIcon } from '@hugeicons/core-free-icons';

type OrderActionsProps = {
  order: OrderRow;
  onCancelClick?: (orderId: string) => void;
};

export function OrderActions({ order, onCancelClick }: OrderActionsProps) {
  const isCancelable =
    order.status === 'PENDING' || order.status === 'CONFIRMED' || order.status === 'PROCESSING';

  const handlePrint = () => {
    window.print();
  };

  const handleCancel = () => {
    if (isCancelable && onCancelClick) {
      onCancelClick(order.id);
    }
  };

  return (
    <div className="flex flex-row sm:flex-col gap-2 w-full sm:max-w-35 lg:ml-auto pt-2 sm:pt-0">
      <Button type="button" size="sm" onClick={handlePrint} className="flex-1 sm:flex-initial">
        <HugeiconsIcon icon={PrinterIcon} className="size-3.5" />
        <span>Print Label</span>
      </Button>

      {isCancelable ? (
        <Button
          type="button"
          onClick={handleCancel}
          variant={'destructive'}
          className="flex-1 sm:flex-initial"
        >
          Cancel Order
        </Button>
      ) : (
        <Button type="button" disabled variant={'outline'} className="flex-1 sm:flex-initial">
          Cancel Order
        </Button>
      )}
    </div>
  );
}
