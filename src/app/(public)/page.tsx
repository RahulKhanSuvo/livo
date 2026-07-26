import HeroSection from '@/components/home/Hero';
import DepartmentGrid from '@/components/home/DepartmentGrid';
import EditorialGrid from '@/components/home/EditorialGrid';
import InteriorEditSlider from '@/components/home/InteriorEditSlider';
import { DesignEditSlider } from '@/components/home/DesignEditSlider';
import { SaleBanner } from '@/components/home/SaleBanner';
import ProductSpotlight from '@/components/home/ProductSpotlight/ProductSpotlight';
import ProductSlider from '@/components/home/ProductSlider/ProductSlider';
import { BrandMarquee } from '@/components/home/BrandMarquee';
import ShopTheRoom from '@/components/home/Shoptheroom/ShopTheRoom';
import GetCreative from '@/components/home/GetCreative';
import BrandValuesMarquee from '@/components/home/BrandValuesMarquee';
import { FeaturedEdits } from '@/components/home/FeaturedEdits';
import { QuickLinks } from '@/components/home/QuickLinks';
import { AtelierSection } from '@/components/home/AtelierSection';
import { TestimonialsSlider } from '@/components/home/TestimonialsSlider';
import { EditorialCards } from '@/components/home/EditorialCards';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <DepartmentGrid />
      <EditorialGrid />
      <DesignEditSlider />
      <SaleBanner />
      <InteriorEditSlider />
      <ProductSpotlight />
      <ProductSlider />
      <BrandMarquee />
      <ShopTheRoom />
      <GetCreative />
      <BrandValuesMarquee />
      <FeaturedEdits />
      <QuickLinks />
      <AtelierSection />
      <TestimonialsSlider />
      <EditorialCards />
    </section>
  );
}
