import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import ProductFilterSheet from '@/components/shared/ProductFilterSheet';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';
import { getShopHeading, resolveShopSlugs } from '@/lib/shopRoute';
import headerImage from '@/assets/header/sofa.webp';

import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { GetAllFurnitureResponse } from '@/actions/furniture/furniture.type';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { FurnitureQuery, furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import { ActionResponse } from '@/lib/createSafeAction';

const ShopCatchAllPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const resolvedParams = await params;
  const rawSearchParams = await searchParams;

  const slugs = resolvedParams.slug ?? [];
  const resolved = resolveShopSlugs(slugs);

  const queryParameters: FurnitureQuery = furnitureQuerySchema.parse({
    ...rawSearchParams,
    category: resolved.room,
    type: resolved.type,
    subtype: resolved.subtype,
  });

  const queryKey = ['products', queryParameters];
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getAllFurnitureAction(queryParameters),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 6,
  });

  const data = queryClient.getQueryData<ActionResponse<GetAllFurnitureResponse>>(queryKey);
  const heading = getShopHeading(resolved);

  return (
    <section>
      <ProductPageHeader
        title={heading.title}
        description={heading.description}
        imageSrc={heading.imageSrc ?? headerImage}
        bgColor={heading.bgColor}
        titleColor={heading.titleColor}
        descColor={heading.descColor}
      />

      <Container className="flex gap-10 pb-16">
        <div className="flex-1">
          <div className="sticky top-11 md:top-24 z-25 flex items-center gap-3 bg-white">
            <div className="flex-1">
              <ProductSortBar totalProducts={data?.data?.total ?? 0} />
            </div>
            <ProductFilterSheet category={resolved.room} subcategory={resolved.type} />
          </div>

          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList queryKey={queryParameters} />
          </HydrationBoundary>
        </div>
      </Container>

      <FeaturesBar />
    </section>
  );
};

export default ShopCatchAllPage;
