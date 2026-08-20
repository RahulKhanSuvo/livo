'use client';

import Image from 'next/image';
import Link from 'next/link';
import { SearchProductResult } from '@/actions/products/searchProductsAction';

interface SearchProductItemProps {
  product: SearchProductResult;
  onSelect: () => void;
}

export function SearchProductItem({ product, onSelect }: SearchProductItemProps) {
  return (
    <Link
      href={product.href}
      onClick={onSelect}
      className="flex items-center gap-3.5 group rounded-sm p-1.5 transition-colors hover:bg-neutral-50"
    >
      <div className="relative size-16 sm:size-20 bg-[#f7f7f7] rounded flex items-center justify-center p-2 shrink-0 overflow-hidden border border-neutral-200/60">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="80px"
            className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-[10px] text-neutral-400">No image</span>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400 truncate">
          {product.brand}
        </span>
        <span className="text-xs font-medium text-neutral-900 group-hover:underline truncate mt-0.5">
          {product.name}
        </span>
        <span className="text-xs font-semibold text-neutral-900 mt-1">{product.price}</span>
      </div>
    </Link>
  );
}
