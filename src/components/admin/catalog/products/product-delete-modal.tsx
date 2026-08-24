'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { deleteProductAction } from '@/actions/products/deleteProductAction';

export function ProductDeleteModal({
  productId,
  productName,
  open,
  onOpenChange,
  onDeleted,
}: {
  productId: string | null;
  productName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!productId) return;
    setIsDeleting(true);
    try {
      const res = await deleteProductAction({ id: productId });
      if (res.success) {
        toast.success('Product deleted');
        queryClient.invalidateQueries({ queryKey: ['products'] });
        queryClient.invalidateQueries({ queryKey: ['product-stats'] });
        onDeleted();
        onOpenChange(false);
      } else {
        toast.error(res.message || 'Failed to delete product');
      }
    } catch {
      toast.error('Failed to delete product');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{productName ? ` “${productName}”` : ' this product'}?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting…' : 'Delete product'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
