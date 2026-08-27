import { OrderRow } from '@/actions/order/getAllOrdersAction';
import Image from 'next/image';

type OrderProductCellProps = {
  order: OrderRow;
};

export function OrderProductCell({ order }: OrderProductCellProps) {
  const firstItem = order.items[0];

  if (!firstItem) {
    return <span className="text-sm text-muted-foreground">No products</span>;
  }

  return (
    <div className="flex gap-3">
      {/* Product image */}
      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
        {firstItem.imageUrl ? (
          <div className="size-40">
            <Image
              src={firstItem.imageUrl}
              alt={firstItem.productName}
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            —
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="min-w-0">
        <p className="font-medium">{firstItem.productName}</p>

        <div className="mt-1 text-xs text-muted-foreground">
          {firstItem.variantName && <span>Variant: {firstItem.variantName}</span>}
        </div>

        <p className="mt-1 text-xs text-muted-foreground">Quantity: {firstItem.quantity}</p>
      </div>
    </div>
  );
}
