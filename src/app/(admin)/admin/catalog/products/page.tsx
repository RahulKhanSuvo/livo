import ProductsState from '@/components/admin/catalog/products/ProductsState';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import ProductPageContent from '@/components/admin/catalog/products/ProductPageContnent';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

export default async function ProductsRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  // 1. Await searchParams first
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 2;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', page, limit],
    queryFn: () =>
      getAllFurnitureAction({
        page,
        limit,
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductPageContent />
      </HydrationBoundary>
    </div>
  );
}
