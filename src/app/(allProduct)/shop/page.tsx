import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import headerImage from '@/assets/header/sofa.webp';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getAllFurniture } from '@/actions/furniture/getAllFurniture';
import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';

const SofaPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const queryParams = await searchParams;
  const search = typeof queryParams.search === 'string' ? queryParams.search : '';

  const sortBy = typeof queryParams.sortBy === 'string' ? queryParams.sortBy : 'createdAt';

  const sortOrder =
    queryParams.sortOrder === 'asc' || queryParams.sortOrder === 'desc'
      ? queryParams.sortOrder
      : 'desc';

  const page = typeof queryParams.page === 'string' ? Math.max(Number(queryParams.page), 1) : 1;

  const limit = typeof queryParams.limit === 'string' ? Math.max(Number(queryParams.limit), 1) : 10;

  // -----------------------------
  // React Query key
  // -----------------------------

  const queryKey = [
    'products',
    {
      search,
      sortBy,
      sortOrder,
      page,
      limit,
    },
  ];

  // -----------------------------
  // Prefetch
  // -----------------------------

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,

    queryFn: () =>
      getAllFurniture(
        page,
        limit,
        search,
        sortBy as 'asc' | 'desc',
        sortOrder as 'createdAt' | 'price'
      ),

    staleTime: 1000 * 60 * 60,

    gcTime: 1000 * 60 * 60 * 6,
  });

  // IMPORTANT:
  // Use the exact same queryKey used above.
  const data = queryClient.getQueryData<GetAllFurnitureResponse>(queryKey);

  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />

      <Container className="flex gap-10 pb-16">
        {/* Filter */}
        <div className="sticky top-20 z-20 w-78 self-start">
          <ProductFilterSidebar />
        </div>

        {/* Products */}
        <div className="flex-1">
          <ProductSortBar totalProducts={data?.total ?? 0} className="sticky top-20 z-25" />

          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList queryKey={queryKey} />
          </HydrationBoundary>
        </div>
      </Container>

      <FeaturesBar />
    </section>
  );
};

export default SofaPage;
