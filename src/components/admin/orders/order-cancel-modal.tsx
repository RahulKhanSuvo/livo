import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cancelOrderAction } from '@/actions/order/cancelOrderAction';

export function OrderCancelModal({
  orderId,
  open,
  onOpenChange,
  onCancelled,
}: {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelled: () => void;
}) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleCancel() {
    if (!orderId) return;
    setIsSaving(true);
    try {
      const res = await cancelOrderAction({ id: orderId });
      if (res.success) {
        const refunded = res.data?.refunded;
        toast.success(refunded ? 'Order cancelled and refunded' : 'Order cancelled');
        router.refresh();
        onCancelled();
        onOpenChange(false);
      } else {
        toast.error(res.message || 'Failed to cancel order');
      }
    } catch {
      toast.error('Failed to cancel order');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel order</DialogTitle>
          <DialogDescription>
            This will mark the order as cancelled and refund the payment if it was paid. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Keep order
          </Button>
          <Button variant="destructive" onClick={handleCancel} disabled={isSaving}>
            {isSaving ? 'Cancelling…' : 'Cancel order'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
