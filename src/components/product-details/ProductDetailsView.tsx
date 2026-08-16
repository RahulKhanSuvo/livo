'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductHeader } from './ProductHeader';
import { VariantSelector } from './VariantSelector';
import { QuantityAddToCart } from './QuantityAddToCart';
import { StockStatus } from './StockStatus';
import { ProductAccordions } from './ProductAccordions';
import { PromoCountdown } from './PromoCountdown';
import { ProductGuarantees } from './ProductGuarantees';
import { PaymentMethods } from './PaymentMethods';
import { Container } from '../shared/Container';
import { Prisma } from '@/generated/prisma/client';

export type ProductWithDetails = Prisma.ProductGetPayload<{
  include: {
    variants: {
      include: {
        images: true;
      };
    };
    brand: true;
    material: true;
  };
}>;

/** Helper: get a display URL from a variant image (ExistingImage | File | string) */
function getImageUrl(image: { imageUrl: string } | File): string {
  if (image instanceof File) return URL.createObjectURL(image);
  return image.imageUrl;
}

export const ProductDetailsView = ({ product }: { product: ProductWithDetails }) => {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // First image of the selected variant is the hero image
  const heroImage = selectedVariant.images[0] ? getImageUrl(selectedVariant.images[0]) : null;

  return (
    <div className="w-full bg-white py-6">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-neutral-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-neutral-700">
            Home
          </Link>
          <span>/</span>
          <span className="text-neutral-700 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full bg-[#f5f5f3] rounded-sm p-8">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={product.name}
                  fill
                  priority
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {selectedVariant.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {selectedVariant.images.map((img, i) => {
                  const url = getImageUrl(img);
                  return (
                    <div
                      key={i}
                      className="relative h-16 w-16 shrink-0 rounded-sm bg-[#f5f5f3] overflow-hidden border border-neutral-200"
                    >
                      <Image
                        src={url}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <ProductHeader
              brand={product.brand?.name ?? ''}
              name={product.name}
              price={product.price}
              salePrice={product.salePrice}
            />

            <VariantSelector
              variants={product.variants}
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />

            <QuantityAddToCart
              stock={selectedVariant.stock}
              onAddToCart={(qty) => console.log('Cart payload:', { product, selectedVariant, qty })}
            />

            <PaymentMethods />

            <StockStatus stock={selectedVariant.stock} />

            <PromoCountdown />

            <ProductGuarantees />

            <ProductAccordions
              description={product.description}
              material={product.material?.name ?? ''}
              width={product.width}
              height={product.height}
              depth={product.depth}
              weightKg={product.weightKg}
              assemblyRequired={product.assemblyRequired}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsView;
