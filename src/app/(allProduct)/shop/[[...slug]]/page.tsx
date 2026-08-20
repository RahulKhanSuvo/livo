import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import ProductFilterSheet from '@/components/shared/ProductFilterSheet';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';
import { getShopHeading, resolveShopSlugs } from '@/lib/shopRoute';
import { getQueryClient } from '@/lib/query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { getFilterOptionsAction } from '@/actions/furniture/getFilterOptions';
import { furnitureQuerySchema } from '@/actions/furniture/furniture.validation';
import headerImage from '@/assets/header/sofa.webp';

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
  const heading = getShopHeading(resolved);

  // Build the exact same query parameters the client components derive from
  // the URL, so the prefetch key matches the useQuery key 1:1.
  const sp = Object.fromEntries(
    Object.entries(rawSearchParams).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
  );

  const queryParameters = furnitureQuerySchema.parse({
    ...sp,
    category: resolved.room,
    type: resolved.type,
    subtype: resolved.subtype,
  });

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products', queryParameters],
    queryFn: () => getAllFurnitureAction(queryParameters),
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: ['filter-options', resolved.room, resolved.type],
    queryFn: () => getFilterOptionsAction({ category: resolved.room, subcategory: resolved.type }),
    staleTime: 1000 * 60 * 10,
  });

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
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex-1">
            <div className="sticky top-11 md:top-24 z-25 flex items-center gap-3 bg-white">
              <div className="flex-1">
                <ProductSortBar />
              </div>
              <ProductFilterSheet category={resolved.room} subcategory={resolved.type} />
            </div>

            <ProductList category={resolved.room} type={resolved.type} subtype={resolved.subtype} />
          </div>
        </HydrationBoundary>
      </Container>

      <FeaturesBar />
    </section>
  );
};

export default ShopCatchAllPage;
