'use client';

import { useCartStore } from '@/stores/cart-store';
import { Button } from '../ui/button';
import { ProductCardItem } from './ProductCard';

type ProductVariant = NonNullable<ProductCardItem['variants']>[number];

interface AddToCartButtonProps {
  product: ProductCardItem;
  selectedVariant?: ProductVariant;
}

export function AddToCartButton({ product, selectedVariant }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

  const firstImage = selectedVariant?.images?.[0];

  const firstImageUrl =
    firstImage instanceof File ? URL.createObjectURL(firstImage) : firstImage?.imageUrl || '';

  const isStockAvailable = (selectedVariant?.stock ?? 0) > 0;

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isStockAvailable || !selectedVariant?.id) {
      return;
    }

    addItem({
      productId: product.id || '',
      variantId: selectedVariant.id,
      quantity: 1,
      price: product.salePrice && product.salePrice > 0 ? product.salePrice : product.price,
      name: product.name,
      image: firstImageUrl,

      productCategory: product.productType?.subCategory?.category?.name || '',

      productSubCategory: product.productType?.subCategory?.name || '',

      productType: product.productType?.name || '',
    });
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 flex translate-y-full items-center justify-center transition-transform duration-300 ease-out group-hover:-translate-y-6">
      <Button
        disabled={!isStockAvailable}
        variant="main"
        className="w-[90%] h-8 text-xs lg:h-9 lg:text-sm"
        onClick={handleAddToCart}
      >
        {isStockAvailable ? 'Add to Cart' : 'Out of stock'}
      </Button>
    </div>
  );
}
