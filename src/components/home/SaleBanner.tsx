import Image from 'next/image';
import Link from 'next/link';
import { Container } from '../shared/Container';
import bannerImage from '@/assets/images/sale-table-picture.webp';
import SaleTimer from './SaleTimer';
export interface SaleBannerData {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: typeof bannerImage;
  imageAlt: string;
  targetDate: string; // ISO string format for countdown
}

export const saleBannerData: SaleBannerData = {
  title: 'Sale',
  description:
    'Discover a curated selection of timeless pieces at exceptional prices. From sculptural sofas to dining essentials, find the perfect addition to your home sanctuary.',
  ctaText: 'Shop the Sale',
  ctaHref: '/sale',
  imageSrc: bannerImage,
  imageAlt: 'Long dining table with red chairs and sunflowers',
  // Set target date 36 days in future for realistic default
  targetDate: new Date(Date.now() + 36 * 24 * 60 * 60 * 1000).toISOString(),
};

export const SaleBanner = () => {
  return (
    <Container className="py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-125 lg:min-h-175 overflow-hidden">
        {/* Left Side - Image Container */}
        <div className="lg:col-span-8 relative min-h-87.5 sm:min-h-112.5 lg:min-h-full w-full">
          <Image
            src={saleBannerData.imageSrc}
            alt={saleBannerData.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover object-center"
          />
        </div>

        {/* Right Side - Dark Maroon Content Section */}
        <div className="lg:col-span-4 bg-[#3A1C28] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between items-start">
          {/* Top & Middle Content */}
          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl sm:text-5xl font-light tracking-tight text-white">
              {saleBannerData.title}
            </h2>

            <p className="text-xs sm:text-sm font-light text-neutral-300 leading-relaxed tracking-normal">
              {saleBannerData.description}
            </p>

            <Link
              href={saleBannerData.ctaHref}
              className="inline-block text-xs sm:text-sm font-light text-white underline underline-offset-8 decoration-white/70 hover:decoration-white transition-all duration-200 pt-2"
            >
              {saleBannerData.ctaText}
            </Link>
          </div>

          {/* Bottom Countdown Timer */}
          <SaleTimer />
        </div>
      </div>
    </Container>
  );
};

export default SaleBanner;
