'use client';

import {
  Edit02Icon,
  MoreHorizontalIcon,
  EyeIcon,
  EyeOffIcon,
  Delete02Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import Link from 'next/link';
import { DataTableColumn } from '@/components/shared/data-table';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/admin/ui/badges';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductWithRelations } from '@/actions/products/getAllProducts';
import type { ProductStatus } from '@/generated/prisma/client';

export function productColumns(handlers: {
  onDelete: (id: string, name: string) => void;
  onSetStatus: (id: string, status: ProductStatus) => void;
}): DataTableColumn<ProductWithRelations>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Product',
      cell: ({ row }) => {
        const product = row.original;
        const image = product.variants?.[0]?.images?.[0];

        const imageUrl = image instanceof File ? URL.createObjectURL(image) : image?.imageUrl;
        return (
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-sm border bg-muted shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  No img
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="truncate font-medium text-foreground">{product.name}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => row.original.brand?.name || '—',
    },
    {
      id: 'price',
      header: 'Price Range',
      cell: ({ row }) => {
        const price = row.original.price;
        return <span className="font-semibold">{`$${price}`}</span>;
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <HugeiconsIcon icon={MoreHorizontalIcon} className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={`/admin/catalog/products/${product.id}`}>
                  <HugeiconsIcon icon={Edit02Icon} className="mr-2 h-4 w-4 text-muted-foreground" />
                  Edit Product
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href={`/products/${product.id}`} target="_blank">
                  <HugeiconsIcon icon={EyeIcon} className="mr-2 h-4 w-4 text-muted-foreground" />
                  Preview in Store
                </Link>
              </DropdownMenuItem>

              {product.status === 'ACTIVE' ? (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handlers.onSetStatus(product.id, 'DEACTIVATED')}
                >
                  <HugeiconsIcon icon={EyeOffIcon} className="mr-2 h-4 w-4 text-muted-foreground" />
                  Deactivate
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handlers.onSetStatus(product.id, 'ACTIVE')}
                >
                  <HugeiconsIcon icon={EyeIcon} className="mr-2 h-4 w-4 text-muted-foreground" />
                  Activate
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-rose-600 focus:bg-rose-50 focus:text-rose-700"
                onClick={() => handlers.onDelete(product.id, product.name)}
              >
                <HugeiconsIcon icon={Delete02Icon} className="mr-2 h-4 w-4" />
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
