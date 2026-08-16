'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '../ui/button';
import { ProductCardItem } from './ProductCard';

interface AddToCartButtonProps {
  product: ProductCardItem;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const firstImage = product?.variants?.[0]?.images?.[0];
  const firstImageUrl =
    firstImage instanceof File
      ? URL.createObjectURL(firstImage)
      : (firstImage as { imageUrl?: string })?.imageUrl || '';

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    addItem({
      productId: product?.id || '',
      variantId: product.variants?.[0]?.id || '',
      quantity: 1,
      price: product?.price || 0,
      name: product?.name || '',
      image: firstImageUrl,
      productCategory: product.productType?.subCategory?.category?.name || '',
      productSubCategory: product.productType?.subCategory?.name || '',
      productType: product.productType?.name || '',
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-6">
      <Button
        disabled={product?.variants?.length === 0}
        variant="main"
        className="w-[90%]"
        onClick={handleAddToCart}
      >
        {product?.variants?.length === 0 ? 'Out of stock' : 'Add to Cart'}
      </Button>
    </div>
  );
}
