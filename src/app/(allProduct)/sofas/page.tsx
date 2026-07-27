import ProductPageHeader from '@/components/shared/ProductPageHeader';
import { Container } from '@/components/shared/Container';
import headerImage from '@/assets/header/sofa.webp';
import ProductFilterSidebar from '@/components/shared/ProductFilterSidebar';
import ProductList from '@/components/shared/ProductList';
import ProductSortBar from '@/components/shared/ProductSortBar';
import FeaturesBar from '@/components/home/FeaturesBar';
const SofaPage = ({}) => {
  return (
    <section>
      <ProductPageHeader title="Sofa" description="Tjos" imageSrc={headerImage} />
      <Container className="flex gap-10 ">
        <div className="w-78 sticky top-20 z-20  self-start">
          <ProductFilterSidebar />
        </div>
        <div className="flex-1">
          <ProductSortBar className="sticky top-20 z-25" />
          <ProductList />
        </div>
      </Container>
      <FeaturesBar />
    </section>
  );
};
export default SofaPage;
