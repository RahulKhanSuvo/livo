import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import headerImage from '@/assets/header/sofa.webp';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
const SofaPage = () => {
  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />
      <Container className="flex gap-10">
        <div>
          <ProductFilterSidebar />
        </div>
        <div className="w-full">
          <ProductSortBar className="sticky top-20 z-20" />
          <ProductList />
        </div>
      </Container>
    </section>
  );
};
export default SofaPage;
