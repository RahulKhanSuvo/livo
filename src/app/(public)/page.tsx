import HeroSection from '@/components/home/Hero';
import DepartmentGrid from '@/components/home/DepartmentGrid';
import EditorialGrid from '@/components/home/EditorialGrid';
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
import { FeaturesBar } from '@/components/home/FeaturesBar';
import InteriorEditSection from '@/components/home/InteriorEditSection';
import { ProductSkeleton } from '@/components/shared/ProductSkeleton';
import { Suspense } from 'react';
import DesignEditSection from '@/components/home/DesignEditSection';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <DepartmentGrid />
      <EditorialGrid />
      <Suspense fallback={<ProductSkeleton />}>
        <DesignEditSection />
      </Suspense>
      <SaleBanner />
      <Suspense fallback={<ProductSkeleton />}>
        <InteriorEditSection />
      </Suspense>
      <ProductSpotlight />
      <ProductSlider />
      <BrandMarquee />
      <ShopTheRoom />
      <GetCreative />
      <BrandValuesMarquee />
      <FeaturedEdits />
      <QuickLinks />
      <TestimonialsSlider />
      <AtelierSection />
      <FeaturesBar />
    </section>
  );
}
