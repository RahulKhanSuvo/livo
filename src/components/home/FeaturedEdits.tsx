'use client';
import Image from 'next/image';
import Link from 'next/link';
import diningEdit from '@/assets/images/Grid-photo-1.webp';
import tactileEdit from '@/assets/images/grid-photo-2.jpeg';
export interface FeatureEditCard {
  id: string;
  subtitle: string;
  title: string;
  actionText: string;
  href: string;
  imageSrc: typeof diningEdit | typeof tactileEdit;
  imageAlt: string;
}

export const featuredEditsData: FeatureEditCard[] = [
  {
    id: 'dining-edit',
    subtitle: 'THE DINING EDIT',
    title: 'Shared Spaces',
    actionText: 'View Collection',
    href: '/shop/dining-room',
    imageSrc: diningEdit,
    imageAlt: 'Modern dining room with round black table and chairs',
  },
  {
    id: 'tactile-edit',
    subtitle: 'THE TACTILE EDIT',
    title: "Nature's Touch",
    actionText: 'Discover Materials',
    href: '/shop/natures-touch',
    imageSrc: tactileEdit,
    imageAlt: 'Close up textured green woven fabric material',
  },
];

export const FeaturedEdits = () => {
  return (
    <section className="w-full bg-white pb-20">
      <div className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {featuredEditsData.map((card) => (
            <Link
              key={card.id}
              href={card.href}
              className="group relative w-full aspect-4/3 sm:aspect-16/10 md:aspect-4/3 lg:aspect-16/15 overflow-hidden bg-neutral-100 block"
            >
              {/* Background Image with Scale Animation */}
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Overlay for Text Legibility */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300" />

              {/* Content Overlay (Bottom Left) */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 z-10 flex flex-col items-start text-white max-w-sm">
                {/* Subtitle */}
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] opacity-90 mb-1.5">
                  {card.subtitle}
                </span>

                {/* Main Heading */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight leading-tight mb-3">
                  {card.title}
                </h3>

                {/* Underlined Action Link */}
                <span className="text-xs sm:text-sm font-normal underline underline-offset-4 decoration-white/70 group-hover:decoration-white transition-all">
                  {card.actionText}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEdits;
