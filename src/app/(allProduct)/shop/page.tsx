import { z } from 'zod';
import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import headerImage from '@/assets/header/sofa.webp';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import { ActionResponse } from '@/lib/createSafeAction';

const SofaPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const queryParams = await searchParams;

  const parsed = furnitureQuerySchema.safeParse(queryParams);

  // If somehow parsing fails (shouldn't happen with .catch() guards), fall back to defaults
  const { search, sortBy, sortOrder, page, limit } = parsed.success
    ? parsed.data
    : furnitureQuerySchema.parse({});

  // Define a type for the parsed query parameters
  type FurnitureQueryParameters = z.infer<typeof furnitureQuerySchema>;

  // Explicitly type the parameters object within the queryKey
  const queryParameters: FurnitureQueryParameters = {
    search,
    sortBy,
    sortOrder,
    page,
    limit,
  };

  const queryKey = [
    'products',
    queryParameters, // Use the explicitly typed object here
  ];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,

    queryFn: () => getAllFurnitureAction(queryParameters),

    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  const data = queryClient.getQueryData<ActionResponse<GetAllFurnitureResponse>>(queryKey);

  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />

      <Container className="flex gap-10 pb-16">
        <div className="sticky top-20 z-20 w-78 self-start">
          <ProductFilterSidebar />
        </div>

        <div className="flex-1">
          <ProductSortBar totalProducts={data?.data?.total ?? 0} className="sticky top-20 z-25" />

          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList queryKey={queryParameters} />
          </HydrationBoundary>
        </div>
      </Container>

      <FeaturesBar />
    </section>
  );
};

export default SofaPage;
