import HeroSection from '@/components/home/Hero';
import DepartmentGrid from '@/components/home/DepartmentGrid';
import EditorialGrid from '@/components/home/EditorialGrid';
import { DesignEditSlider } from '@/components/home/DesignEditSlider';
import { SaleBanner } from '@/components/home/SaleBanner';

export default function Home() {
  return (
    <section>
      <HeroSection />
      <DepartmentGrid />
      <EditorialGrid />
      <DesignEditSlider />
      <SaleBanner />
    </section>
  );
}
