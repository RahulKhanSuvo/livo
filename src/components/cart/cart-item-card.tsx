'use client';

import Image from 'next/image';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Add01Icon, Remove01Icon, Delete02Icon } from '@hugeicons/core-free-icons';

import { CartItem, useCartStore } from '@/stores/cart-store';

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [imageError, setImageError] = useState(false);

  const itemTotal = item.price * item.quantity;
  const formattedTotal = itemTotal.toLocaleString('en-BD', {
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col gap-4 border-b border-neutral-200 py-6 last:border-b-0 sm:flex-row sm:items-start sm:gap-6">
      {/* Product Image */}
      <div className="relative size-32 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-100 sm:size-36">
        {item.image && !imageError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-center"
            onError={() => setImageError(true)}
            sizes="(max-width: 640px) 128px, 144px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
            No image
          </div>
        )}
      </div>

      {/* Product Info & Controls */}
      <div className="flex flex-1 flex-col justify-between gap-3">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-neutral-900 leading-snug sm:text-base">{item.name}</h3>
          {(item.productCategory || item.productSubCategory || item.productType) && (
            <p className="text-xs leading-relaxed text-neutral-500 max-w-xl">
              {[item.productCategory, item.productSubCategory, item.productType]
                .filter(Boolean)
                .join(' • ')}
            </p>
          )}
          <p className="text-sm font-semibold text-neutral-800 pt-1">
            Total: <span className="font-bold text-neutral-900">{formattedTotal} BDT</span>
          </p>
        </div>

        {/* Quantity Controls & Delete Action */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center rounded border border-neutral-300 bg-white">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity - 1)}
              className="flex size-8 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
              aria-label="Decrease quantity"
            >
              <HugeiconsIcon icon={Remove01Icon} size={14} />
            </button>
            <span className="flex h-8 w-10 items-center justify-center text-xs font-semibold text-neutral-800 border-x border-neutral-200">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.variantId, item.quantity + 1)}
              className="flex size-8 items-center justify-center text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-black"
              aria-label="Increase quantity"
            >
              <HugeiconsIcon icon={Add01Icon} size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId, item.variantId)}
            className="flex size-8 items-center justify-center rounded bg-red-50 text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
            aria-label="Remove item"
          >
            <HugeiconsIcon icon={Delete02Icon} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
