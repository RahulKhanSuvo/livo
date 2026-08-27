import { BoxIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import type { OrderRow, OrderItemRow } from '@/actions/order/getAllOrdersAction';

type OrderProductCellProps = {
  item?: OrderItemRow;
  order?: OrderRow;
};

export function OrderProductCell({ item, order }: OrderProductCellProps) {
  const productItem = item ?? order?.items?.[0];

  if (!productItem) {
    return <span className="text-sm text-muted-foreground">No products</span>;
  }

  return (
    <div className="flex items-stretch gap-3">
      {/* Product image */}
      <div className="relative size-18 shrink-0 overflow-hidden rounded bg-gray-100 p-1 dark:bg-zinc-800/80">
        {productItem.imageUrl ? (
          <div className="relative size-full overflow-hidden rounded">
            <Image
              src={productItem.imageUrl}
              alt={productItem.productName}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex size-full items-center justify-center text-muted-foreground">
            <HugeiconsIcon icon={BoxIcon} />
          </div>
        )}
      </div>

      {/* Product information */}
      <div className="flex h-17 min-w-0 flex-col justify-between">
        <h4 className="cursor-pointer line-clamp-1 text-sm font-medium  dark:text-zinc-100 dark:hover:text-blue-400">
          {productItem.productName}
        </h4>

        <div className="flex items-center gap-1 text-xs">
          <p>Color:</p>

          {productItem.colorName && (
            <span
              className="inline-block size-3 rounded-full border border-white shadow-sm"
              style={{ backgroundColor: productItem.colorName }}
            />
          )}
        </div>

        <div className="text-xs font-normal text-gray-500 dark:text-zinc-400">
          <p>Quantity: {productItem.quantity}</p>
        </div>
      </div>
    </div>
  );
}
