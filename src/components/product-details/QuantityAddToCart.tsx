'use client';

import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Minus, Plus } from '@hugeicons/core-free-icons';
import { Button } from '../ui/button';

interface QuantityAddToCartProps {
  stock: number;
  onAddToCart?: (quantity: number) => void;
}

export const QuantityAddToCart: React.FC<QuantityAddToCartProps> = ({ stock, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const isOutOfStock = stock <= 0;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  return (
    <div className="flex items-center gap-3 pt-2">
      {/* Stepper */}
      <div className="flex-1 flex items-center justify-between h-11 w-28 rounded-full border border-neutral-300 px-3 bg-white">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 1 || isOutOfStock}
          className="text-neutral-600 hover:text-black disabled:opacity-30 transition-colors"
          aria-label="Decrease quantity"
        >
          <HugeiconsIcon icon={Minus} className="h-4 w-4" />
        </button>

        <span className="text-xs font-medium text-neutral-900">{isOutOfStock ? 0 : quantity}</span>

        <button
          type="button"
          onClick={handleIncrease}
          disabled={quantity >= stock || isOutOfStock}
          className="text-neutral-600 hover:text-black disabled:opacity-30 transition-colors"
          aria-label="Increase quantity"
        >
          <HugeiconsIcon icon={Plus} className="h-4 w-4" />
        </button>
      </div>

      {/* Add To Cart */}
      <Button
        type="button"
        disabled={isOutOfStock}
        onClick={() => onAddToCart && onAddToCart(quantity)}
        className="flex-1 h-11 rounded-full text-white text-xs font-medium disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
      >
        {isOutOfStock ? 'Out of Stock' : 'Add to cart'}
      </Button>
    </div>
  );
};
