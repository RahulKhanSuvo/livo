import ProductsState from '@/components/admin/catalog/products/ProductsState';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import ProductPageContent from '@/components/admin/catalog/products/ProductPageContnent';
import { productsQuery } from '@/queries/products.query';
export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;
  const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';
  const status =
    resolvedParams.status === 'ACTIVE' || resolvedParams.status === 'DEACTIVATED'
      ? resolvedParams.status
      : undefined;
  const brand = typeof resolvedParams.brand === 'string' ? resolvedParams.brand : undefined;
  const stock = typeof resolvedParams.stock === 'string' ? resolvedParams.stock : undefined;
  const category =
    typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    productsQuery({
      page,
      limit,
      search,
      status,
      brand,
      stock,
      category,
    })
  );

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

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductsState />
        <ProductPageContent />
      </HydrationBoundary>
    </div>
  );
}
