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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateOrderStatusAction } from '@/actions/order/updateOrderStatusAction';
import type { OrderStatus } from '@/generated/prisma/client';

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'CONFIRMED', label: 'Confirmed' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export function OrderStatusModal({
  orderId,
  currentStatus,
  open,
  onOpenChange,
  onUpdated,
}: {
  orderId: string | null;
  currentStatus?: OrderStatus;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated: () => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus | undefined>(currentStatus);
  const [isSaving, setIsSaving] = useState(false);

  async function handleUpdate() {
    if (!orderId || !status) return;
    setIsSaving(true);
    try {
      const res = await updateOrderStatusAction({ id: orderId, status });
      if (res.success) {
        toast.success('Order status updated');
        router.refresh();
        onUpdated();
        onOpenChange(false);
      } else {
        toast.error(res.message || 'Failed to update status');
      }
    } catch {
      toast.error('Failed to update status');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update order status</DialogTitle>
          <DialogDescription>Select the new status and save.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={status} onValueChange={(v) => setStatus(v as OrderStatus)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={handleUpdate} disabled={isSaving || !status}>
              {isSaving ? 'Saving…' : 'Update status'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
