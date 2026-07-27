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
import { Product } from '@/types/product.type';

export const ProductDetailsView = ({ product }: { product: Product }) => {
  // Active variant state
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div className="w-full bg-white py-6">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-neutral-400 flex items-center gap-1.5">
          <Link href="/" className="hover:text-neutral-700">
            Home
          </Link>
          <span>/</span>
          <span className="capitalize">{product.category}</span>
          <span>/</span>
          <span className="text-neutral-700 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="relative aspect-square w-full bg-[#f5f5f3] rounded-sm p-8">
              {/* Badges */}
              {product.badges?.map((badge) => (
                <span
                  key={badge.id}
                  className="absolute top-4 left-4 z-10 rounded-full bg-[#1e40af] px-3 py-1 text-[11px] font-medium text-white"
                >
                  {badge.label}
                </span>
              ))}

              <Image
                src={selectedVariant.mainImage}
                alt={product.name}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <ProductHeader
              brand={product.brand}
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
              specifications={product.specifications}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsView;
