'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AddToCartButton } from './AddToCartButton';

export interface ProductCardItem {
  id?: string;
  name: string;
  price: number;
  salePrice?: number | null;
  brand?: { name?: string | null } | string | null;
  brandId?: string | null;
  variants?: Array<{
    id?: string;
    colorHex?: string | null;
    stock?: number;
    images?: Array<
      | {
          imageUrl: string;
        }
      | File
    >;
  }>;
}

const ProductCard = ({ product, basePath }: { product: ProductCardItem; basePath: string }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product?.variants?.[selectedVariant];
  const displayPrice = product?.price;
  const displaySalePrice = product?.salePrice;
  const firstImage = variant?.images?.[0];
  const secondImage = variant?.images?.[1];

  const firstImageUrl =
    firstImage instanceof File
      ? URL.createObjectURL(firstImage)
      : (firstImage as { imageUrl?: string })?.imageUrl || '';

  const secondImageUrl =
    secondImage instanceof File
      ? URL.createObjectURL(secondImage)
      : (secondImage as { imageUrl?: string })?.imageUrl || firstImageUrl;

  const brandName =
    typeof product?.brand === 'object' && product?.brand !== null
      ? product.brand.name
      : typeof product?.brand === 'string'
        ? product.brand
        : null;

  return (
    <div className="flex flex-col">
      <Link
        href={`${basePath}/${product.id || ''}`}
        className="relative cursor-pointer aspect-square w-full bg-[#f6f6f6] flex items-center justify-center overflow-hidden group"
      >
        {firstImageUrl && (
          <Image
            src={firstImageUrl}
            alt={product?.name || 'Product'}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
            className="absolute inset-0 object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
          />
        )}

        {secondImageUrl && (
          <Image
            src={secondImageUrl}
            alt={product?.name || 'Product'}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
            className="absolute inset-0 object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
          />
        )}
        <AddToCartButton productId={product.id!} variantId={variant?.id} />
      </Link>

      <div className="pt-4 flex flex-col space-y-1">
        {brandName && (
          <span className="text-[11px] tracking-wider text-neutral-400 uppercase font-medium">
            {brandName}
          </span>
        )}
        <h3 className="text-sm font-normal text-neutral-900 tracking-tight">{product?.name}</h3>

        <div className="flex items-center gap-2 pt-0.5">
          {displaySalePrice ? (
            <>
              <span className="text-sm text-neutral-400 line-through">
                ${displayPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-normal text-[#7A2A2A]">
                ${displaySalePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs bg-[#7A2A2A] text-white px-1.5 py-0.5 rounded text-[10px]">
                -{Math.round(((displayPrice - displaySalePrice) / displayPrice) * 100)}%
              </span>
            </>
          ) : (
            <span className="text-sm font-normal text-neutral-900">
              ${displayPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
          )}
        </div>

        {(product?.variants?.length ?? 0) > 1 && (
          <div className="flex items-center gap-1.5 pt-2">
            {product?.variants?.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(idx)}
                className={`w-4 h-4 rounded-full border transition-all relative overflow-hidden ${
                  idx === selectedVariant ? 'border-neutral-900 scale-110' : 'border-neutral-300'
                } ${v.stock === 0 ? 'opacity-60' : ''}`}
                style={{ backgroundColor: v.colorHex ?? undefined }}
                aria-label={`${v.colorHex ?? 'No color'}${v.stock === 0 ? ' (Out of Stock)' : ''}`}
              >
                {v.stock === 0 && (
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="absolute w-[1.5px] h-full bg-neutral-500 rotate-45" />
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
