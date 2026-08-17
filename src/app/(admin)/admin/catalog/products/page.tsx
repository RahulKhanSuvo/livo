import ProductsState from '@/components/admin/catalog/products/ProductsState';
import ProductTable from '@/components/admin/catalog/products/ProductTable';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllProducts } from '@/actions/products/getAllProducts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProductPageContent from '@/components/admin/catalog/products/ProductPageContnent';

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  // 1. Await searchParams first
  const resolvedParams = await searchParams;

  // 2. Extract page and limit (with fallback defaults)
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', page, limit],
    queryFn: () => getAllProducts(page, limit),
  });

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
      <ProductsState />
      <ProductTable />
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* Pass page & limit down if needed */}
        <ProductPageContent page={page} limit={limit} />
      </HydrationBoundary>
    </div>
  );
}
