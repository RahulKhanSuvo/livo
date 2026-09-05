'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProductResult } from '@/types/ai-assistant';

interface AiProductCardProps {
  product: ProductResult;
}

export function AiProductCard({ product }: AiProductCardProps) {
  const hasDiscount = product.salePrice > 0 && product.salePrice < product.price;
  const displayPrice = hasDiscount ? product.salePrice : product.price;
  const originalPrice = hasDiscount ? product.price : null;
  const discount = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-sm border border-neutral-200/80 dark:border-neutral-800 bg-card shadow-xs transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-neutral-100 dark:bg-neutral-800/80">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 180px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-3xl text-neutral-400">
            🛋️
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute top-1.5 left-1.5 rounded-sm bg-[#d98e63] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
            -{discount}%
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-2.5">
        <div>
          <p className="line-clamp-2 text-[11px] font-medium leading-snug text-foreground">
            {product.name}
          </p>

          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-foreground">
              ${displayPrice.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-[10px] text-muted-foreground line-through">
                ${originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="mt-2 flex items-center justify-center rounded-sm bg-primary px-2.5 py-1.5 text-[11px] font-medium text-primary-foreground transition-colors hover:bg-[#3d5747]"
        >
          View Product
        </Link>
      </div>
    </div>
  );
}
