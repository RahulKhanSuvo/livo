'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import { getOrderByIdAction, type OrderDetail } from '@/actions/order/getOrderByIdAction';

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-0.5 text-sm text-foreground">{value || '—'}</p>
    </div>
  );
}

function DetailContent({ order }: { order: OrderDetail }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={order.status} />
        <StatusBadge status={order.paymentStatus} />
        <span className="ml-auto text-xs text-muted-foreground">{order.createdAt}</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Customer" value={order.fullName} />
        <Field label="Phone" value={order.phone} />
        <Field label="Email" value={order.email} />
        <Field
          label="Address"
          value={`${order.address}, ${order.area}, ${order.district}, ${order.division}, ${order.country}${
            order.postalCode ? ` ${order.postalCode}` : ''
          }`}
        />
        <div className="col-span-2">
          <Field label="Notes" value={order.notes} />
        </div>
      </div>

      <div>
        <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Items
        </p>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-foreground/10 p-2.5"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    No img
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.productName}</p>
                <p className="text-xs text-muted-foreground">{item.variantName || '—'}</p>
              </div>
              <div className="shrink-0 text-right text-sm">
                <p className="font-medium">{formatMoney(item.totalPrice)}</p>
                <p className="text-xs text-muted-foreground">
                  {item.quantity} × {formatMoney(item.unitPrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-1.5 rounded-xl bg-muted/40 p-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatMoney(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{formatMoney(order.shippingFee)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Discount</span>
          <span>{formatMoney(order.discount)}</span>
        </div>
        <div className="flex justify-between border-t border-foreground/10 pt-1.5 font-semibold text-foreground">
          <span>Total</span>
          <span>{formatMoney(order.total)}</span>
        </div>
      </div>
    </div>
  );
}

export function OrderDetailModal({
  orderId,
  open,
  onOpenChange,
}: {
  orderId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderByIdAction({ id: orderId as string }),
    enabled: open && !!orderId,
  });

  const order = data?.data ?? null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{order?.orderNumber ?? 'Order details'}</DialogTitle>
          <DialogDescription>Full breakdown for this order.</DialogDescription>
        </DialogHeader>

        {isLoading || !order ? (
          <div className="space-y-4">
            <Skeleton className="h-5 w-40" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-28 w-full" />
          </div>
        ) : (
          <DetailContent order={order} />
        )}
      </DialogContent>
    </Dialog>
  );
}
