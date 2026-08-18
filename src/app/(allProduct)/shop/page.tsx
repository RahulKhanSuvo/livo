import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';
import { getShopHeaderDetails } from '@/components/shared/shopHeader.data';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { FurnitureQuery, furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import { ActionResponse } from '@/lib/createSafeAction';

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) => {
  const queryParams = await searchParams;

  const parsed = furnitureQuerySchema.safeParse(queryParams);

  const { search, category, subcategory, sortBy, sortOrder, page, limit } = parsed.success
    ? parsed.data
    : furnitureQuerySchema.parse({});

  const queryParameters: FurnitureQuery = {
    search,
    category,
    subcategory,
    sortBy,
    sortOrder,
    page,
    limit,
  };

  const queryKey = ['products', queryParameters];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getAllFurnitureAction(queryParameters),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  const data = queryClient.getQueryData<ActionResponse<GetAllFurnitureResponse>>(queryKey);
  const headerDetails = getShopHeaderDetails(category, subcategory);

  return (
    <section>
      <ProductPageHeader
        title={headerDetails.title}
        description={headerDetails.description}
        imageSrc={headerDetails.imageSrc}
      />

      <Container className="flex gap-10 pb-16">
        <div className="sticky top-20 z-20 w-78 self-start">
          <ProductFilterSidebar />
        </div>

        <div className="flex-1">
          <ProductSortBar totalProducts={data?.data?.total ?? 0} className="sticky top-24 z-25" />

          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList queryKey={queryParameters} />
          </HydrationBoundary>
        </div>
      </Container>

      <FeaturesBar />
    </section>
  );
};

export default ShopPage;
