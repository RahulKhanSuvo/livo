'use client';

import { useState } from 'react';

type Variant = {
  id?: string;
  colorHex?: string | null;
  stock?: number;
};

export function ProductVariantSelector({ variants }: { variants: Variant[] }) {
  const [selectedVariant, setSelectedVariant] = useState(0);

  return (
    <div className="flex items-center gap-1.5 pt-2">
      {variants.map((variant, index) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => setSelectedVariant(index)}
          className={`relative h-4 w-4 overflow-hidden rounded-full border transition-all ${
            index === selectedVariant ? 'scale-110 border-neutral-900' : 'border-neutral-300'
          } ${variant.stock === 0 ? 'opacity-60' : ''}`}
          style={{
            backgroundColor: variant.colorHex ?? undefined,
          }}
        >
          {variant.stock === 0 && (
            <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <span className="absolute h-full w-[1.5px] rotate-45 bg-neutral-500" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
