'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Alert01Icon,
  CheckmarkCircle01Icon,
  MoreHorizontalIcon,
  PackageIcon,
  PackageOutOfStockIcon,
  PlusSignIcon,
} from '@hugeicons/core-free-icons';

import { AddProductDialog } from './products';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge, Avatar } from '@/components/admin/ui/badges';
import { formatMoney, initials } from '@/components/admin/ui/format';
import { StatCard } from '@/components/admin/ui/stat-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  products,
  categories,
  subcategories,
  productTypes,
  brands,
  inventory,
  type Product,
  type CategoryItem,
  type SubcategoryItem,
  type ProductTypeItem,
  type BrandItem,
  type InventoryItem,
} from './catalog.data';

function RowActions() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Row actions">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Duplicate</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function TableActions({ label }: { label: string }) {
  return (
    <Button className="gap-1.5">
      <HugeiconsIcon icon={PlusSignIcon} size={16} />
      {label}
    </Button>
  );
}

const productCols: Column<Product>[] = [
  {
    key: 'product',
    header: 'Product',
    cell: (r) => (
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#4b6b56]/10 text-[10px] font-bold text-[#4b6b56]">
          {initials(r.name)}
        </span>
        <div>
          <p className="font-medium">{r.name}</p>
          <p className="text-xs text-muted-foreground">{r.brand}</p>
        </div>
      </div>
    ),
  },
  { key: 'sku', header: 'SKU', cell: (r) => <span className="font-mono text-xs">{r.sku}</span> },
  {
    key: 'category',
    header: 'Category',
    cell: (r) => <span className="text-foreground/80">{r.category}</span>,
  },
  {
    key: 'price',
    header: 'Price',
    cell: (r) => <span className="font-medium">{formatMoney(r.price)}</span>,
  },
  { key: 'stock', header: 'Stock', cell: (r) => <span className="font-medium">{r.stock}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const categoryCols: Column<CategoryItem>[] = [
  {
    key: 'name',
    header: 'Category',
    cell: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-muted-foreground">/{r.slug}</p>
      </div>
    ),
  },
  {
    key: 'products',
    header: 'Products',
    cell: (r) => <span className="font-medium">{r.products}</span>,
  },
  {
    key: 'description',
    header: 'Description',
    cell: (r) => <span className="text-foreground/70">{r.description}</span>,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const subcategoryCols: Column<SubcategoryItem>[] = [
  {
    key: 'name',
    header: 'Subcategory',
    cell: (r) => <span className="font-medium">{r.name}</span>,
  },
  {
    key: 'parent',
    header: 'Parent',
    cell: (r) => <span className="text-foreground/80">{r.parent}</span>,
  },
  {
    key: 'products',
    header: 'Products',
    cell: (r) => <span className="font-medium">{r.products}</span>,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const productTypeCols: Column<ProductTypeItem>[] = [
  {
    key: 'name',
    header: 'Product type',
    cell: (r) => <span className="font-medium">{r.name}</span>,
  },
  {
    key: 'products',
    header: 'Products',
    cell: (r) => <span className="font-medium">{r.products}</span>,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const brandCols: Column<BrandItem>[] = [
  {
    key: 'name',
    header: 'Brand',
    cell: (r) => (
      <div className="flex items-center gap-3">
        <Avatar initials={initials(r.name)} tone="#8a9b80" />
        <span className="font-medium">{r.name}</span>
      </div>
    ),
  },
  {
    key: 'country',
    header: 'Origin',
    cell: (r) => <span className="text-foreground/80">{r.country}</span>,
  },
  {
    key: 'products',
    header: 'Products',
    cell: (r) => <span className="font-medium">{r.products}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge status={r.active ? 'Active' : 'Inactive'} />,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const inventoryCols: Column<InventoryItem>[] = [
  {
    key: 'name',
    header: 'Item',
    cell: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-muted-foreground">{r.location}</p>
      </div>
    ),
  },
  { key: 'sku', header: 'SKU', cell: (r) => <span className="font-mono text-xs">{r.sku}</span> },
  {
    key: 'onHand',
    header: 'On hand',
    cell: (r) => <span className="font-medium">{r.onHand}</span>,
  },
  {
    key: 'reserved',
    header: 'Reserved',
    cell: (r) => <span className="text-foreground/70">{r.reserved}</span>,
  },
  {
    key: 'available',
    header: 'Available',
    cell: (r) => (
      <span className={r.available <= 0 ? 'font-semibold text-destructive' : 'font-medium'}>
        {r.available}
      </span>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (r) => {
      const status =
        r.available === 0 ? 'Out of stock' : r.available < r.reorderPoint ? 'Low' : 'Active';
      return <StatusBadge status={status} />;
    },
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

export function ProductsPage() {
  const [addProductOpen, setAddProductOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Every piece in your catalogue — from sculptural sofas to dining essentials."
        actions={
          <Button className="gap-1.5" onClick={() => setAddProductOpen(true)}>
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add product
          </Button>
        }
      />
      <AddProductDialog open={addProductOpen} onOpenChange={setAddProductOpen} />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total products" value="181" delta="+6.2%" icon={PackageIcon} />
        <StatCard
          label="Active"
          value="152"
          delta="+4.1%"
          icon={CheckmarkCircle01Icon}
          accent="#d98e63"
        />
        <StatCard label="Low stock" value="8" hint="reorder needed" icon={Alert01Icon} />
        <StatCard
          label="Out of stock"
          value="5"
          delta="-2"
          trend="down"
          icon={PackageOutOfStockIcon}
          accent="#d98e63"
        />
      </div>
      <DataTable columns={productCols} data={products} keyField={(r) => r.id} />
    </div>
  );
}

export function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Your top-level taxonomy: Living Room, Dining Room, Bedroom and beyond."
        actions={<TableActions label="Add category" />}
      />
      <DataTable columns={categoryCols} data={categories} keyField={(r) => r.id} />
    </div>
  );
}

export function SubcategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Subcategories"
        description="Second-level groupings such as Sofas, Tables and Lighting inside each room."
        actions={<TableActions label="Add subcategory" />}
      />
      <DataTable columns={subcategoryCols} data={subcategories} keyField={(r) => r.id} />
    </div>
  );
}

export function ProductTypePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Types"
        description="Fine-grained types like Sectional Sofas and Lounge Chairs that power your filters."
        actions={<TableActions label="Add type" />}
      />
      <DataTable columns={productTypeCols} data={productTypes} keyField={(r) => r.id} />
    </div>
  );
}

export function BrandsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Brands"
        description="The designers and houses you carry — SITS, HAY, MUUTO, Vitra and more."
        actions={<TableActions label="Add brand" />}
      />
      <DataTable columns={brandCols} data={brands} keyField={(r) => r.id} />
    </div>
  );
}

export function InventoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventory"
        description="Live stock levels across your fulfilment centres."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Adjust stock</Button>
            <Button className="gap-1.5">
              <HugeiconsIcon icon={PlusSignIcon} size={16} />
              Receive
            </Button>
          </div>
        }
      />
      <DataTable columns={inventoryCols} data={inventory} keyField={(r) => r.id} />
    </div>
  );
}
