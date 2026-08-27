import { BoxIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import type { OrderRow, OrderItemRow } from '@/actions/order/getAllOrdersAction';

type OrderProductCellProps = {
  item?: OrderItemRow;
  order?: OrderRow;
  onItemClick?: () => void;
};

export function OrderProductCell({ item, order, onItemClick }: OrderProductCellProps) {
  const productItem = item ?? order?.items?.[0];

  if (!productItem) {
    return <span className="text-sm text-muted-foreground">No products</span>;
  }

  return (
    <div className="flex items-stretch gap-3 ">
      {/* Product image thumbnail */}
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-800/80 p-1 flex items-center justify-center relative">
        {productItem.imageUrl ? (
          <div className="relative size-full overflow-hidden rounded">
            <Image
              src={productItem.imageUrl}
              alt={productItem.productName}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground font-medium">
            <HugeiconsIcon icon={BoxIcon} />
          </div>
        )}
      </div>

      {/* Product information */}
      <div className=" flex flex-col justify-between h-full">
        <h4
          onClick={onItemClick}
          className="font-bold text-sm text-gray-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors line-clamp-1"
        >
          {productItem.productName}
        </h4>

        <div className="mt-0.5 text-xs text-gray-500 dark:text-zinc-400 font-normal space-y-0.5">
          {productItem.variantName && <p>Variant: {productItem.variantName}</p>}
          <p>Quantity: {productItem.quantity}</p>
        </div>
      </div>
    </div>
  );
}
