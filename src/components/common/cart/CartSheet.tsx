'use client';

import { useState } from 'react';
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

interface CartItem {
  id: string;
  name: string;
  color?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  href: string;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Parade 240 HAY table lamp',
    price: 130,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400&auto=format&fit=crop',
    href: '/shop/parade-240-hay-table-lamp',
  },
  {
    id: '2',
    name: 'Yasuke DCW Editions table lamp',
    price: 4500,
    originalPrice: 5000,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=400&auto=format&fit=crop',
    href: '/shop/yasuke-dcw-editions-table-lamp',
  },
];

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSheet = ({ isOpen, onClose }: CartSheetProps) => {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const originalSubtotal = items.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const savings = Math.max(0, originalSubtotal - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full data-[side=right]:sm:max-w-130 bg-white p-0 gap-0 flex flex-col h-full border-l border-neutral-200"
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 shrink-0">
          <SheetTitle className="text-xl font-medium text-neutral-900">
            Your cart ({totalCount})
          </SheetTitle>
          <SheetClose
            onClick={onClose}
            className="p-1 text-neutral-600 hover:text-black transition-colors"
            aria-label="Close cart"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={24} />
          </SheetClose>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Progress / Discounts Bar */}
          <div className="bg-[#f5f5f3] px-6 py-3 border-b border-neutral-200">
            <p className="text-xs text-neutral-600 text-center mb-3">
              Spend $370.00 more for Free Delivery!
            </p>
            {/* Progress line with nodes */}
            <div className="relative flex items-center justify-between max-w-[280px] mx-auto pt-1 pb-1">
              <div className="absolute top-3.5 left-3 right-3 h-[3px] bg-neutral-200 -z-0" />
              <div className="absolute top-3.5 left-3 w-1/2 h-[3px] bg-[#8a9284] -z-0" />

              {/* Node 1: -10% */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-[#8a9284] text-white flex items-center justify-center text-[10px]">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                </div>
                <span className="text-[10px] font-medium text-neutral-600">-10%</span>
              </div>

              {/* Node 2: Free Delivery */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-[#e8eae6] text-neutral-600 flex items-center justify-center text-[10px]">
                  <HugeiconsIcon icon={DeliveryTruck01Icon} size={12} />
                </div>
                <span className="text-[10px] font-medium text-neutral-600">Free Delivery</span>
              </div>

              {/* Node 3: -20% */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-[#e8eae6] text-neutral-600 flex items-center justify-center text-[10px]">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                </div>
                <span className="text-[10px] font-medium text-neutral-600">-20%</span>
              </div>
            </div>
          </div>

          {/* Product Items List */}
          <div className="p-6 space-y-6">
            {items.length === 0 ? (
              <div className="py-12 text-center text-neutral-500">
                <p className="text-sm font-medium">Your cart is empty.</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-4 px-5 py-2 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  {/* Thumbnail */}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="relative w-20 h-20 bg-[#f7f7f7] shrink-0 overflow-hidden flex items-center justify-center border border-neutral-100"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain"
                    />
                  </Link>

                  {/* Info & Quantity */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="text-sm font-normal text-neutral-900 hover:underline block truncate leading-snug"
                    >
                      {item.name}
                    </Link>

                    {/* Quantity Pill + Delete */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-neutral-300 rounded-full px-3 py-1 text-xs text-neutral-800 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-0.5 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <HugeiconsIcon icon={Remove01Icon} size={10} />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-0.5 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <HugeiconsIcon icon={Add01Icon} size={10} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-normal text-neutral-900">
                      $
                      {(item.price * item.quantity).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Summary & View Cart */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 p-6 bg-white shrink-0 space-y-3">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-base font-semibold text-neutral-900">Subtotal</span>
              <div className="text-right">
                <span className="text-lg font-semibold text-neutral-900">
                  ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD
                </span>
                {originalSubtotal > subtotal && (
                  <span className="block text-xs text-neutral-400 line-through">
                    ${originalSubtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>
            </div>

            {/* Savings Callout */}
            {savings > 0 && (
              <div className="space-y-0.5 text-xs text-neutral-600">
                <p className="font-medium text-neutral-800">
                  You&apos;ve saved ${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  !
                </p>
                <p className="flex items-center gap-1 text-[11px] text-neutral-500">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                  10% Off (-${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                </p>
              </div>
            )}

            <p className="text-xs text-neutral-400">Shipping &amp; taxes calculated at checkout</p>

            {/* View Cart Button */}
            <Link
              href="/cart"
              onClick={onClose}
              className="block w-full py-3.5 bg-[#363432] hover:bg-black text-white text-center text-sm font-medium rounded-full transition-colors"
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
