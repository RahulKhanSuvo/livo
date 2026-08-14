import ProductsState from '@/components/admin/catalog/products/ProductsState';
import ProductTable from '@/components/admin/catalog/products/ProductTable';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductsRoute() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Every piece in your catalogue — from sculptural sofas to dining essentials."
        actions={
          <Button asChild>
            <Link href="/admin/catalog/products/new">Add New Product</Link>
          </Button>
        }
      />
      <ProductsState />
      <ProductTable />
    </div>
  );
}
