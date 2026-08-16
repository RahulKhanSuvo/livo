'use client';

import React from 'react';
import type { ProductWithDetails } from './ProductDetailsView';

type Variant = ProductWithDetails['variants'][number];

interface VariantSelectorProps {
  variants: Variant[];
  selectedVariant: Variant;
  onSelectVariant: (variant: Variant) => void;
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
        Color: <span className="text-neutral-900">{selectedVariant.colorHex ?? 'Default'}</span>
      </span>
      <div className="flex items-center gap-2">
        {variants.map((variant, i) => {
          const isSelected = variant.id
            ? variant.id === selectedVariant.id
            : i === variants.indexOf(selectedVariant);
          return (
            <button
              key={variant.id ?? i}
              type="button"
              onClick={() => onSelectVariant(variant)}
              title={variant.colorHex ?? 'Default'}
              className={`h-7 w-7 rounded-full flex items-center justify-center border transition-all ${
                isSelected ? 'border-neutral-900 ring-2 ring-neutral-900/20' : 'border-transparent'
              }`}
            >
              <span
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: variant.colorHex ?? '#cccccc' }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
