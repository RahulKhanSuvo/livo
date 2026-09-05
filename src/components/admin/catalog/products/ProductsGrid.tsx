'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { EyeIcon, CheckIcon, PauseIcon, Delete02Icon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/admin/ui/badges';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AdminFurniture } from '@/actions/furniture/getAdminAllFurniture';
// import type { ProductStatus } from '@/generated/prisma/client';

interface ProductsGridProps {
  products: AdminFurniture[];
  total?: number;
}

const btnCls = 'rounded-sm';

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <TooltipProvider>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4 transition-opacity sm:grid-cols-3 lg:grid-cols-4">
          {(products ?? []).map((product) => {
            const image = product.variants?.[0]?.images?.[0];
            const imageUrl = image instanceof File ? URL.createObjectURL(image) : image?.imageUrl;
            const totalStock = product.variants?.reduce((acc, v) => acc + (v.stock || 0), 0) ?? 0;
            const isActive = product.status === 'ACTIVE';

            return (
              <div key={product.id} className="flex flex-col border border-neutral-200 bg-white">
                <div className="relative aspect-square w-full overflow-hidden bg-neutral-100">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
                      No image
                    </div>
                  )}

                  <div className="absolute left-2 top-2">
                    <StatusBadge status={product.status} />
                  </div>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        variant="outline"
                        size="icon-sm"
                        className={`${btnCls} absolute right-2 top-2 bg-white/90`}
                      >
                        <Link href={`/product/${product.id}`} target="_blank">
                          <HugeiconsIcon icon={EyeIcon} size={14} />
                          <span className="sr-only">Preview</span>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>View product</TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex flex-1 flex-col gap-1 p-3">
                  <p className="truncate text-sm font-medium text-neutral-900">{product.name}</p>
                  <p className="truncate text-xs text-neutral-500">{product.brand?.name || '—'}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-neutral-900">
                      ${Number(product.price).toLocaleString()}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        totalStock > 0 ? 'text-emerald-700' : 'text-rose-700'
                      }`}
                    >
                      {totalStock > 0 ? `${totalStock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">
                    {product.variants?.length || 0} variants
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-neutral-200 p-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="outline" size="sm" className={`${btnCls} flex-1`}>
                        <Link href={`/admin/catalog/products/${product.id}`}>Edit</Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Edit product</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className={`${btnCls} ${
                          isActive
                            ? 'text-amber-600 hover:bg-amber-50'
                            : 'text-emerald-600 hover:bg-emerald-50'
                        }`}
                        // onClick={() => onSetStatus(product.id, isActive ? 'DEACTIVATED' : 'ACTIVE')}
                        aria-label={isActive ? 'Deactivate' : 'Activate'}
                      >
                        <HugeiconsIcon icon={isActive ? PauseIcon : CheckIcon} size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isActive ? 'Deactivate' : 'Activate'}</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon-sm"
                        className={`${btnCls} text-rose-600 hover:bg-rose-50`}
                        // onClick={() => onDelete(product.id, product.name)}
                        aria-label="Delete"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}

export default ProductsGrid;
