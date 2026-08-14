'use client';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import { DataTableColumn } from '@/components/shared/data-table';
import { Product } from '@/components/admin/catalog/products/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Edit02Icon } from '@hugeicons/core-free-icons';

export const productColumns: DataTableColumn<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product',
    cell: ({ row }) => {
      const product = row.original;
      // Get main image from the first variant
      const mainImage =
        product.variants?.[0]?.images?.find((img) => img.type === 'MAIN')?.imageUrl ||
        product.variants?.[0]?.images?.[0]?.imageUrl;

      return (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border bg-muted">
            {mainImage ? (
              <Image src={mainImage} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                No img
              </div>
            )}
          </div>
          <div>
            <div className="font-medium text-foreground">{product.name}</div>
            <div className="text-xs text-muted-foreground">{product.slug}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    cell: ({ row }) => row.original.brand || '—',
  },
  {
    id: 'price',
    header: 'Price Range',
    cell: ({ row }) => {
      const variants = row.original.variants || [];
      if (variants.length === 0) return '—';

      const prices = variants.map((v) => Number(v.price));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      return (
        <span className="font-semibold">
          {minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`}
        </span>
      );
    },
  },
  {
    id: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const totalStock = row.original.variants?.reduce((acc, v) => acc + (v.stock || 0), 0);

      return (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            totalStock > 0
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
              : 'bg-rose-50 text-rose-700 ring-1 ring-rose-600/20'
          }`}
        >
          {totalStock > 0 ? `${totalStock} in stock` : 'Out of stock'}
        </span>
      );
    },
  },
  {
    id: 'variantsCount',
    header: 'Variants',
    cell: ({ row }) => `${row.original.variants?.length || 0} variants`,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Button variant={'link'} asChild>
          <Link href={`/admin/catalog/products/${product.id}`}>
            <HugeiconsIcon icon={Edit02Icon} />
          </Link>
        </Button>
      );
    },
  },
];
