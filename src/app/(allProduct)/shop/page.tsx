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
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const queryParamsObjects = await searchParams;
  const queryClient = new QueryClient();
  const { search = '', sortBy = 'asc', sortOrder = 'createdAt' } = queryParamsObjects;
  console.log('searchParamsObjects', queryParamsObjects);
  await queryClient.prefetchQuery({
    queryKey: ['product', queryParamsObjects],
    queryFn: () =>
      getAllFurniture(
        Number(queryParamsObjects.page || 1),
        Number(queryParamsObjects.limit || 10),
        search as string,
        sortBy as 'asc' | 'desc',
        sortOrder as 'createdAt' | 'price'
      ),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
  });
  const data = queryClient.getQueryData<GetAllFurnitureResponse>(['product']);

  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />
      <Container className="flex gap-10 pb-16">
        <div className="w-78 sticky top-20 z-20  self-start">
          <ProductFilterSidebar />
        </div>
        <div className="flex-1">
          <ProductSortBar totalProducts={data?.total} className="sticky top-20 z-25" />
          <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductList />
          </HydrationBoundary>
        </div>
      </Container>
      <FeaturesBar />
    </section>
  );
};
export default SofaPage;
