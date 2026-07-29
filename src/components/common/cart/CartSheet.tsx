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
  Tick02Icon,
  Note01Icon,
  Tag01Icon,
  DeliveryTruck01Icon,
} from '@hugeicons/core-free-icons';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';

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
    name: 'Hémicycle Vis-à-Vis Sofa',
    price: 7810,
    originalPrice: 9762.5,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop',
    href: '/shop/living-room/hemicycle-vis-a-vis-sofa',
  },
  {
    id: '2',
    name: 'Colin - 3 Seater Sofa',
    color: 'Grey',
    price: 1500,
    originalPrice: 1875,
    quantity: 2,
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=400&auto=format&fit=crop',
    href: '/shop/living-room/colin-3-seater-sofa',
  },
];

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartSheet = ({ isOpen, onClose }: CartSheetProps) => {
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [freeAssembly, setFreeAssembly] = useState(false);
  const [activeTab, setActiveTab] = useState<'none' | 'note' | 'discount' | 'shipping'>('none');
  const [orderNote, setOrderNote] = useState('');
  const [discountCode, setDiscountCode] = useState('');

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
        className="w-full sm:max-w-[460px] bg-white p-0 gap-0 flex flex-col h-full border-l border-neutral-200"
      >
        {/* Sheet Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100 shrink-0">
          <SheetTitle className="text-base font-semibold text-neutral-900">
            Your cart ({totalCount})
          </SheetTitle>
          <SheetClose
            onClick={onClose}
            className="p-1.5 text-neutral-600 hover:text-black transition-colors rounded-full hover:bg-neutral-100"
            aria-label="Close cart"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </SheetClose>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto">
          {/* Progress / Discounts Bar */}
          <div className="bg-[#eaf3e9] px-6 py-3.5 border-b border-[#dbebd9]">
            <p className="text-[12px] font-semibold text-[#3b5e37] text-center mb-2.5">
              All discounts unlocked!
            </p>
            {/* Progress line with nodes */}
            <div className="relative flex items-center justify-between max-w-[320px] mx-auto pt-1">
              <div className="absolute top-[9px] left-3 right-3 h-[2px] bg-[#4a7246] -z-0" />

              {/* Node 1: -10% */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#4a7246] text-white flex items-center justify-center text-[9px] font-bold">
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-medium text-neutral-700 mt-0.5">-10%</span>
              </div>

              {/* Node 2: Free Delivery */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#4a7246] text-white flex items-center justify-center text-[9px] font-bold">
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-medium text-neutral-700 mt-0.5">
                  Free Delivery
                </span>
              </div>

              {/* Node 3: -20% */}
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#4a7246] text-white flex items-center justify-center text-[9px] font-bold">
                  <HugeiconsIcon icon={Tick02Icon} size={10} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-medium text-neutral-700 mt-0.5">-20%</span>
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
                <div key={item.id} className="flex gap-4 items-start">
                  {/* Thumbnail */}
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="relative w-20 h-20 bg-[#f7f7f7] rounded-xs shrink-0 overflow-hidden p-1 flex items-center justify-center border border-neutral-100"
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
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="text-xs font-semibold text-neutral-900 hover:underline block truncate leading-tight"
                      >
                        {item.name}
                      </Link>
                      {item.color && (
                        <p className="text-[11px] text-neutral-500 mt-0.5">Color: {item.color}</p>
                      )}
                    </div>

                    {/* Quantity Pill + Delete */}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-neutral-300 rounded-full px-2 py-0.5 text-xs text-neutral-800 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:text-black transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <HugeiconsIcon icon={Remove01Icon} size={12} />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:text-black transition-colors"
                          aria-label="Increase quantity"
                        >
                          <HugeiconsIcon icon={Add01Icon} size={12} />
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
                    <span className="text-xs font-semibold text-neutral-900">
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

          {items.length > 0 && (
            <>
              {/* Checkbox: Free Assembly */}
              <div className="px-6 py-2">
                <label className="flex items-center gap-2.5 text-xs text-neutral-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={freeAssembly}
                    onChange={(e) => setFreeAssembly(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-black focus:ring-0 accent-black cursor-pointer"
                  />
                  <span>I choose free assembly</span>
                </label>
              </div>

              {/* Action Buttons Row: Order Note, Discount Code, Shipping */}
              <div className="px-6 pt-3 pb-4">
                <div className="grid grid-cols-3 gap-2 border-y border-neutral-100 py-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'note' ? 'none' : 'note')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium transition-colors rounded ${
                      activeTab === 'note'
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    <HugeiconsIcon icon={Note01Icon} size={14} />
                    <span>Order Note</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'discount' ? 'none' : 'discount')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium transition-colors rounded ${
                      activeTab === 'discount'
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    <HugeiconsIcon icon={Tag01Icon} size={14} />
                    <span>Discount Code</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === 'shipping' ? 'none' : 'shipping')}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 text-[11px] font-medium transition-colors rounded ${
                      activeTab === 'shipping'
                        ? 'bg-neutral-100 text-black font-semibold'
                        : 'text-neutral-700 hover:text-black'
                    }`}
                  >
                    <HugeiconsIcon icon={DeliveryTruck01Icon} size={14} />
                    <span>Shipping</span>
                  </button>
                </div>

                {/* Tab Input Panels */}
                {activeTab === 'note' && (
                  <div className="mt-3 animate-in fade-in duration-150">
                    <textarea
                      value={orderNote}
                      onChange={(e) => setOrderNote(e.target.value)}
                      placeholder="Add special instructions for your order..."
                      rows={2}
                      className="w-full text-xs p-2.5 border border-neutral-300 rounded outline-none focus:border-black transition-colors resize-none"
                    />
                  </div>
                )}

                {activeTab === 'discount' && (
                  <div className="mt-3 flex gap-2 animate-in fade-in duration-150">
                    <input
                      type="text"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 text-xs px-3 py-2 border border-neutral-300 rounded outline-none focus:border-black"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 bg-neutral-900 text-white text-xs font-semibold rounded hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}

                {activeTab === 'shipping' && (
                  <div className="mt-3 text-xs text-neutral-600 bg-neutral-50 p-3 rounded animate-in fade-in duration-150">
                    <p className="font-medium text-neutral-900 mb-1">Standard Shipping</p>
                    <p>Free delivery unlocked for orders over $500.00.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 p-6 bg-white shrink-0 space-y-3">
            {/* Subtotal */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-semibold text-neutral-900">Subtotal</span>
              <div className="text-right">
                <span className="text-base font-bold text-neutral-900">
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
              <div className="space-y-0.5 text-xs font-medium text-[#2d6a2e]">
                <p>
                  You&apos;ve saved ${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  !
                </p>
                <p className="flex items-center gap-1 text-[11px]">
                  <HugeiconsIcon icon={Tag01Icon} size={12} />
                  20% Off (-${savings.toLocaleString('en-US', { minimumFractionDigits: 2 })})
                </p>
              </div>
            )}

            <p className="text-[11px] text-neutral-500">
              Shipping &amp; taxes calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full py-3.5 bg-[#333333] hover:bg-black text-white text-center text-xs font-bold uppercase tracking-wider rounded-full transition-colors shadow-xs"
            >
              Check out
            </Link>

            {/* Payment Method Badges */}
            <div className="pt-2 flex items-center justify-center gap-2 flex-wrap opacity-80 scale-95">
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#1a1f71] text-white rounded">
                VISA
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#eb001b] text-white rounded">
                MasterCard
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#006fcf] text-white rounded">
                AMEX
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#003087] text-white rounded">
                PayPal
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#ff6000] text-white rounded">
                Discover
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold bg-[#5a31f4] text-white rounded">
                Shop Pay
              </span>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
