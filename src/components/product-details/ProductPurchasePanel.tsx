'use client';

import { useCartStore } from '@/stores/cart-store';
import { useProductVariant } from './ProductVariantContext';
import { VariantSelector } from './VariantSelector';
import { QuantityAddToCart } from './QuantityAddToCart';
import { StockStatus } from './StockStatus';
import type { ProductWithDetails } from './types';

function getImageUrl(image: { imageUrl: string } | File): string {
  if (image instanceof File) return URL.createObjectURL(image);
  return image.imageUrl;
}

export const ProductPurchasePanel = ({ product }: { product: ProductWithDetails }) => {
  const { variant, setVariant } = useProductVariant();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (quantity: number) => {
    if (!variant?.id) return;

    const firstImage = variant.images[0];
    const imageUrl = firstImage ? getImageUrl(firstImage) : '';

    addItem({
      productId: product.id,
      variantId: variant.id,
      quantity,
      price: product.salePrice && product.salePrice > 0 ? product.salePrice : product.price,
      name: product.name,
      image: imageUrl,
      productCategory: product.productType?.subCategory?.category?.name ?? '',
      productSubCategory: product.productType?.subCategory?.name ?? '',
      productType: product.productType?.name ?? '',
    });
  };

  return (
    <div className="flex flex-col space-y-4">
      <VariantSelector
        variants={product.variants}
        selectedVariant={variant}
        onSelectVariant={setVariant}
      />

      <QuantityAddToCart stock={variant.stock} onAddToCart={handleAddToCart} />

      <StockStatus stock={variant.stock} />
    </div>
  );
};

export default ProductPurchasePanel;
