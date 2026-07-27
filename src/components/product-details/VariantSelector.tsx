'use client';

import { ProductVariant } from '@/types/product.type';
import React from 'react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariant,
  onSelectVariant,
}) => {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-2 pt-2">
      <span className="text-xs text-neutral-600 font-medium">
        Color: <span className="text-neutral-900">{selectedVariant.color}</span>
      </span>
      <div className="flex items-center gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelectVariant(variant)}
              className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all ${
                isSelected ? 'border-neutral-900 ring-2 ring-neutral-900/20' : 'border-transparent'
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: variant.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
