'use client';

import React from 'react';

interface ProductHeaderProps {
  brand: string;
  name: string;
  price: number;
  salePrice?: number;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({ brand, name, price, salePrice }) => {
  const currentPrice = salePrice ?? price;
  const originalPrice = salePrice ? price : null;

  return (
    <div className="space-y-1">
      <span className="text-xs uppercase tracking-wider text-neutral-500 font-medium">{brand}</span>
      <h1 className="text-2xl sm:text-3xl font-medium text-neutral-900 tracking-tight">{name}</h1>
      <div className="pt-2 flex items-baseline gap-2">
        <span className="text-2xl font-medium text-neutral-900">${currentPrice.toFixed(2)}</span>
        {originalPrice && (
          <span className="text-sm text-neutral-400 line-through">${originalPrice.toFixed(2)}</span>
        )}
      </div>
      <p className="text-[11px] text-neutral-500 font-light mt-0.5">Tax included</p>
    </div>
  );
};
