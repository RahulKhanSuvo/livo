'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingCart02Icon } from '@hugeicons/core-free-icons';

import { CartItem } from '@/stores/cart-store';

interface CartOrderSummaryProps {
  items: CartItem[];
}

export function CartOrderSummary({ items }: CartOrderSummaryProps) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  const [district, setDistrict] = useState('');
  const [area, setArea] = useState('');
  const [dealer, setDealer] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount);

  const formattedSubtotal = subtotal.toLocaleString('en-BD', {
    maximumFractionDigits: 2,
  });

  const formattedTotal = total.toLocaleString('en-BD', {
    maximumFractionDigits: 2,
  });

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    // Demonstration coupon logic
    if (couponCode.toUpperCase() === 'LIVO10') {
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      setAppliedCoupon('LIVO10 (10% OFF)');
    } else {
      setAppliedCoupon(null);
      setDiscountAmount(0);
      alert('Invalid coupon code. Try "LIVO10" for 10% off!');
    }
  };

  return (
    <div className="w-full shrink-0 space-y-6 lg:w-96">
      {/* Main Order Summary Box */}
      <div className="border border-neutral-200 bg-white p-6 rounded-md">
        <h2 className="text-base font-normal text-neutral-800 border-b border-neutral-200 pb-3 mb-4">
          Order Summary
        </h2>

        {/* Subtotal */}
        <div className="flex items-center justify-between text-sm py-2">
          <span className="text-neutral-600">Sub Total</span>
          <span className="font-medium text-neutral-900">{formattedSubtotal} BDT</span>
        </div>

        {/* Coupon Section */}
        <form onSubmit={handleApplyCoupon} className="my-4 flex items-center gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter Coupon code"
            className="h-10 flex-1 rounded border border-neutral-300 bg-neutral-50/50 px-3 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:border-neutral-500"
          />
          <button
            type="submit"
            className="h-10 px-5 rounded bg-neutral-400 text-xs font-medium text-white transition-colors hover:bg-neutral-600"
          >
            Apply
          </button>
        </form>

        {appliedCoupon && (
          <div className="mb-4 flex items-center justify-between text-xs text-green-700 bg-green-50 p-2 rounded border border-green-200">
            <span>Coupon applied: {appliedCoupon}</span>
            <button
              type="button"
              onClick={() => {
                setAppliedCoupon(null);
                setDiscountAmount(0);
                setCouponCode('');
              }}
              className="text-xs font-semibold underline text-red-600 ml-2"
            >
              Remove
            </button>
          </div>
        )}

        {/* Total */}
        <div className="flex items-center justify-between text-sm pt-3 border-t border-dashed border-neutral-200 font-semibold text-neutral-900">
          <span>Total</span>
          <span className="text-base">{formattedTotal} BDT</span>
        </div>

        {/* Delivery Location Section */}
        <div className="mt-6 rounded border border-neutral-200 bg-[#f6f6f6] p-4">
          <h3 className="text-xs font-normal text-neutral-700 mb-3">
            Select Location To EST. Delivery Time
          </h3>

          <div className="space-y-2.5">
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-9 rounded border border-neutral-300 bg-white px-3 text-xs text-neutral-600 focus:border-neutral-500 outline-none"
            >
              <option value="">Select District</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="sylhet">Sylhet</option>
              <option value="rajshahi">Rajshahi</option>
            </select>

            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full h-9 rounded border border-neutral-300 bg-white px-3 text-xs text-neutral-600 focus:border-neutral-500 outline-none"
            >
              <option value="">Select Area</option>
              <option value="gulshan">Gulshan</option>
              <option value="banani">Banani</option>
              <option value="dhanmondi font-serif">Dhanmondi</option>
              <option value="uttara">Uttara</option>
            </select>

            <select
              value={dealer}
              onChange={(e) => setDealer(e.target.value)}
              className="w-full h-9 rounded border border-neutral-300 bg-white px-3 text-xs text-neutral-600 focus:border-neutral-500 outline-none"
            >
              <option value="">Select Dealer</option>
              <option value="flagship">Livo Flagship Store</option>
              <option value="central">Central Distribution Center</option>
            </select>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="mt-6">
          <Link
            href="/checkout"
            className="flex h-11 w-full items-center justify-center gap-2 rounded border border-neutral-300 bg-white text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50 shadow-xs"
          >
            <span>Checkout</span>
            <HugeiconsIcon icon={ShoppingCart02Icon} size={16} />
          </Link>
        </div>

        {/* Or / Continue Shopping */}
        <div className="mt-4 text-center">
          <span className="text-xs text-neutral-400 block mb-2">Or</span>
          <Link
            href="/shop"
            className="text-xs font-semibold text-red-600 hover:underline transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
