'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '../ui/button';

interface AddToCartButtonProps {
  productId: string;
  variantId?: string;
}

export function AddToCartButton({ productId, variantId }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      productId,
      variantId,
      quantity: 1,
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-6">
      <Button variant="main" className="w-[90%]" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
  );
}
