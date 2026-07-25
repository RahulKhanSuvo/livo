import Image from 'next/image';
import Link from 'next/link';
import { EditorialBanner } from './data';

interface BannerCardProps {
  item: EditorialBanner;
  isFeatured?: boolean;
}

const BannerCard = ({ item, isFeatured = false }: BannerCardProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden border-none rounded-none group cursor-pointer">
      {/* Next.js Optimized Image */}
      <Image
        src={item.imageSrc}
        alt={item.alt}
        fill
        priority={isFeatured}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
      />

      {/* Subtle Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/15 group-hover:bg-black/25 transition-colors duration-1000" />

      {/* Content Positioned Exact to Design */}
      <div
        className={`absolute inset-0 flex flex-col  p-6 sm:p-8 md:p-10 z-10 text-white ${
          isFeatured
            ? 'items-start text-left justify-start'
            : 'items-center text-center justify-center'
        }`}
      >
        <div className="space-y-2.5 max-w-md">
          <h2
            className={`font-sans tracking-tight text-white drop-shadow-sm whitespace-pre-line ${
              isFeatured
                ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-[1.15]'
                : 'text-xl sm:text-2xl lg:text-3xl font-medium leading-snug'
            }`}
          >
            {item.title}
          </h2>

          <Link
            href={item.href}
            className="inline-block text-xs sm:text-sm font-light text-white/90 hover:text-white underline underline-offset-4 decoration-white/70 hover:decoration-white transition-all duration-500 pt-1"
          >
            {item.ctaText}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default BannerCard;
