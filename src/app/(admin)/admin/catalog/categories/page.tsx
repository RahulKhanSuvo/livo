'use client';

import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import type { DataTableColumn } from '@/components/data-table/data-table';
import { DataTable } from '@/components/data-table/data-table';
import { categories, type CategoryItem } from '@/components/admin/catalog/catalog.data';

const columns: Array<DataTableColumn<CategoryItem>> = [
  {
    accessorKey: 'name',
    header: 'Category',
    cell: (info) => (
      <div>
        <p className="font-medium">{info.getValue<string>()}</p>
        <p className="text-xs text-muted-foreground">/{info.row.original.slug}</p>
      </div>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Products',
    cell: (info) => <span className="font-medium">{info.getValue<number>()}</span>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: (info) => <span className="text-muted-foreground">{info.getValue<string>()}</span>,
  },
];

export default function CategoriesRoute() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Your top-level taxonomy: Living Room, Dining Room, Bedroom and beyond."
        actions={<Button className="gap-1.5">Add category</Button>}
      />
      <DataTable key="categories" data={categories} columns={columns} />
    </div>
  );
}
