'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { ProductWithDetails } from './types';

type Variant = ProductWithDetails['variants'][number];

interface ProductVariantContextValue {
  variant: Variant;
  setVariant: (variant: Variant) => void;
}

const ProductVariantContext = createContext<ProductVariantContextValue | null>(null);

export function ProductVariantProvider({
  initialVariant,
  children,
}: {
  initialVariant: Variant;
  children: ReactNode;
}) {
  const [variant, setVariant] = useState(initialVariant);

  return (
    <ProductVariantContext.Provider value={{ variant, setVariant }}>
      {children}
    </ProductVariantContext.Provider>
  );
}

export function useProductVariant() {
  const ctx = useContext(ProductVariantContext);
  if (!ctx) {
    throw new Error('useProductVariant must be used within a ProductVariantProvider');
  }
  return ctx;
}
