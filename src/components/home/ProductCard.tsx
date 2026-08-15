'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ProductValidationType } from '@/actions/products/productValidation';

const ProductCard = ({
  product,
  basePath,
}: {
  product: ProductValidationType;
  basePath: string;
}) => {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product.variants[selectedVariant];
  const displayPrice = variant.price;
  const displaySalePrice = variant.salePrice;
  console.log(product);
  const firstImage = variant.images[0];
  const secondImage = variant.images[1];

  const firstImageUrl =
    firstImage instanceof File ? URL.createObjectURL(firstImage) : firstImage?.imageUrl;

  const secondImageUrl =
    secondImage instanceof File ? URL.createObjectURL(secondImage) : secondImage?.imageUrl;
  return (
    <div className="flex flex-col">
      <Link
        href={`${basePath}/${product.id}`}
        className="relative cursor-pointer aspect-square w-full bg-[#f6f6f6] flex items-center justify-center p-8 overflow-hidden group"
      >
        <Image
          src={firstImageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="absolute inset-0 object-contain p-6 transition-opacity duration-700 ease-in-out group-hover:opacity-0"
        />

        <Image
          src={secondImageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 25vw"
          className="absolute inset-0 object-contain p-6 opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-full transition-transform duration-300 ease-out group-hover:-translate-y-6 flex items-center justify-center">
          <Button variant={'main'} className={'w-[90%]'}>
            Add to Cart
          </Button>
        </div>
      </Link>

      <div className="pt-4 flex flex-col space-y-1">
        <span className="text-[11px] tracking-wider text-neutral-400 uppercase font-medium">
          {product.brand}
        </span>
        <h3 className="text-sm font-normal text-neutral-900 tracking-tight">{product.name}</h3>

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

        {product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 pt-2">
            {product.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(idx)}
                className={`w-4 h-4 rounded-full border transition-all relative overflow-hidden ${
                  idx === selectedVariant ? 'border-neutral-900 scale-110' : 'border-neutral-300'
                } ${v.stock === 0 ? 'opacity-60' : ''}`}
                style={{ backgroundColor: v.colorHex }}
                aria-label={`${v.colorHex}${v.stock === 0 ? ' (Out of Stock)' : ''}`}
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
