import HeroSection from '@/components/home/Hero';
import DepartmentGrid from '@/components/home/DepartmentGrid';
import EditorialGrid from '@/components/home/EditorialGrid';
import InteriorEditSlider from '@/components/home/InteriorEditSlider';
import { DesignEditSlider } from '@/components/home/DesignEditSlider';
import { SaleBanner } from '@/components/home/SaleBanner';
import ProductSpotlight from '@/components/home/ProductSpotlight/ProductSpotlight';
import ProductSlider from '@/components/home/ProductSlider/ProductSlider';

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
    </section>
  );
}
