'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Add01Icon,
  Remove01Icon,
  Delete02Icon,
  Tag01Icon,
  DeliveryTruck01Icon,
} from '@hugeicons/core-free-icons';

import { Sheet, SheetContent, SheetTitle, SheetClose } from '@/components/ui/sheet';

import { CartItem, useCartStore } from '@/stores/cart-store';

interface CartSheetProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const CartSheet = ({ items, isOpen, onClose }: CartSheetProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const removeItem = useCartStore((state) => state.removeItem);

  // Total number of products
  const totalCount = items.reduce((total, item) => total + item.quantity, 0);

  // Cart subtotal
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Currently we don't have originalPrice in CartItem,
  // so there is no discount calculation yet.
  const originalSubtotal = subtotal;
  const savings = 0;

  // Free delivery threshold
  const freeDeliveryThreshold = 500;

  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const deliveryProgress = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <SheetContent
        side="right"
        showCloseButton={false}
        className="flex h-full w-full flex-col gap-0 border-l border-neutral-200 bg-white p-0 data-[side=right]:sm:max-w-130"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-6 py-4">
          <SheetTitle className="text-xl font-medium text-neutral-900">
            Your cart ({totalCount})
          </SheetTitle>

          <SheetClose
            onClick={onClose}
            className="p-1 text-neutral-600 transition-colors hover:text-black"
            aria-label="Close cart"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </SheetClose>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Discount / Delivery Progress */}
          <div className="border-b border-neutral-200 bg-[#f5f5f3] px-6 py-3">
            <p className="mb-3 text-center text-xs text-neutral-600">
              {remainingForFreeDelivery > 0
                ? `Spend $${remainingForFreeDelivery.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })} more for Free Delivery!`
                : 'You qualify for Free Delivery!'}
            </p>

            <div className="relative mx-auto flex max-w-70 items-center justify-between pb-1 pt-1">
              {/* Background line */}
              <div className="absolute left-3 right-3 top-3.5 z-0 h-0.75 bg-neutral-200" />

              {/* Progress line */}
              <div
                className="absolute left-3 top-3.5 z-0 h-0.75 bg-[#8a9284] transition-all duration-300"
                style={{
                  width: `calc(${deliveryProgress}% - 24px)`,
                }}
              />

              {/* Node 1 */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8a9284] text-white">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                </div>

                <span className="text-[10px] font-medium text-neutral-600">-10%</span>
              </div>

              {/* Node 2 */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full ${
                    subtotal >= freeDeliveryThreshold
                      ? 'bg-[#8a9284] text-white'
                      : 'bg-[#e8eae6] text-neutral-600'
                  }`}
                >
                  <HugeiconsIcon icon={DeliveryTruck01Icon} size={12} />
                </div>

                <span className="text-[10px] font-medium text-neutral-600">Free Delivery</span>
              </div>

              {/* Node 3 */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8eae6] text-neutral-600">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                </div>

                <span className="text-[10px] font-medium text-neutral-600">-20%</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="space-y-6 p-6">
            {items.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                <p className="text-sm font-medium">Your cart is empty.</p>

                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 rounded-full bg-black px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemKey = `${item.productId}-${item.variantId ?? 'default'}`;

                const itemTotal = item.price * item.quantity;

                return (
                  <div key={itemKey} className="flex items-center gap-4">
                    {/* Product image */}
                    <Link
                      href={`/product/${item.productId}`}
                      onClick={onClose}
                      className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-neutral-100 bg-[#f7f7f7]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                    </Link>

                    {/* Product info */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/product/${item.productId}`}
                        onClick={onClose}
                        className="block truncate text-sm font-normal leading-snug text-neutral-900 hover:underline"
                      >
                        {item.name}
                      </Link>

                      {/* Quantity + Delete */}
                      <div className="mt-3 flex items-center gap-3">
                        <div className="flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-800">
                          {/* Decrease */}
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.variantId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                            className="p-0.5 transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <HugeiconsIcon icon={Remove01Icon} size={10} />
                          </button>

                          <span className="w-6 text-center font-medium">{item.quantity}</span>

                          {/* Increase */}
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.productId, item.variantId, item.quantity + 1)
                            }
                            className="p-0.5 transition-colors hover:text-black"
                            aria-label="Increase quantity"
                          >
                            <HugeiconsIcon icon={Add01Icon} size={10} />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.variantId)}
                          className="p-1 text-neutral-400 transition-colors hover:text-red-600"
                          aria-label={`Remove ${item.name}`}
                        >
                          <HugeiconsIcon icon={Delete02Icon} size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 text-right">
                      <span className="text-sm font-normal text-neutral-900">
                        $
                        {itemTotal.toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="shrink-0 space-y-3 border-t border-neutral-200 bg-white p-6">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold text-neutral-900">Subtotal</span>

              <div className="text-right">
                <span className="text-lg font-semibold text-neutral-900">
                  $
                  {subtotal.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}{' '}
                  USD
                </span>

                {originalSubtotal > subtotal && (
                  <span className="block text-xs text-neutral-400 line-through">
                    $
                    {originalSubtotal.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                )}
              </div>
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div className="space-y-0.5 text-xs text-neutral-600">
                <p className="font-medium text-neutral-800">
                  You&apos;ve saved $
                  {savings.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                  !
                </p>

                <p className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                  10% Off (-$
                  {savings.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                  )
                </p>
              </div>
            )}

            <p className="text-xs text-neutral-400">Shipping &amp; taxes calculated at checkout</p>

            {/* View Cart */}
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full rounded-full bg-[#363432] py-3.5 text-center text-sm font-medium text-white transition-colors hover:bg-black"
            >
              View Cart
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
