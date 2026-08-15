import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import headerImage from '@/assets/header/sofa.webp';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getAllFurniture } from '@/actions/furniture/getAllFurniture';
const SofaPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['product'],
    queryFn: () => getAllFurniture(),
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 6, // 6 hours
  });

  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />
      <Container className="flex gap-10 pb-16">
        <div className="w-78 sticky top-20 z-20  self-start">
          <ProductFilterSidebar />
        </div>
        <div className="flex-1">
          <ProductSortBar className="sticky top-20 z-25" />
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
