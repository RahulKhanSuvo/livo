import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Suspense } from 'react';
import ProductsStatsSection from '@/components/admin/catalog/products/ProductsStatsSection';
import ProductsListSection from '@/components/admin/catalog/products/ProductsListSection';
import { StatCardsSkeleton, ProductGridSkeleton } from '@/components/admin/ui/admin-skeletons';

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Products"
        description="Every piece in your catalogue — from sculptural sofas to dining essentials."
        actions={
          <Button asChild>
            <Link href="/admin/catalog/products/new">
              <span>Add New</span>
            </Link>
          </Button>
        }
      />

      {/* Stats stream independently */}
      <Suspense fallback={<StatCardsSkeleton />}>
        <ProductsStatsSection />
      </Suspense>
      <Suspense fallback={<ProductGridSkeleton />}>
        <ProductsListSection searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
