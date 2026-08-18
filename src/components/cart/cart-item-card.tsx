'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, Remove01Icon, Delete02Icon } from '@hugeicons/core-free-icons';

import { CartItem, useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { formatMoney } from '@/components/admin/ui/format';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [imageError, setImageError] = useState(false);

  const itemTotal = item.price * item.quantity;
  const formattedTotal = formatMoney(itemTotal);

  return (
    <div className="flex flex-col gap-4 border-b border-border py-5 last:border-b-0 sm:flex-row sm:items-center sm:gap-6">
      {/* Product Image */}
      <div className="relative size-28 shrink-0 overflow-hidden border border-border bg-muted sm:size-32">
        {item.image && !imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-center transition-transform hover:scale-105 duration-300"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 112px, 128px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Product Info & Controls */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="space-y-1">
          <h3 className="font-semibold text-foreground font-heading text-sm sm:text-base leading-snug">
            {item.name}
          </h3>
          {(item.productCategory || item.productSubCategory || item.productType) && (
            <p className="text-xs text-muted-foreground max-w-xl">
              {[item.productCategory, item.productSubCategory, item.productType]
                .filter(Boolean)
                .join(' • ')}
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-1">
            Price: <span className="font-medium text-foreground">{formatMoney(item.price)}</span>
          </p>
        </div>

        {/* Quantity Controls & Delete Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center rounded-lg border border-border bg-background shadow-xs">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
              className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground rounded-l-lg"
              aria-label="Decrease quantity"
            >
              <HugeiconsIcon icon={Remove01Icon} size={14} />
            </button>
            <span className="flex h-8 w-9 items-center justify-center text-xs font-semibold text-foreground border-x border-border">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
              className="flex size-8 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground rounded-r-lg"
              aria-label="Increase quantity"
            >
              <HugeiconsIcon icon={Add01Icon} size={14} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-foreground">{formattedTotal}</span>

            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => removeItem(item.productId, item.variantId)}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Remove item"
            >
              <HugeiconsIcon icon={Delete02Icon} size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
