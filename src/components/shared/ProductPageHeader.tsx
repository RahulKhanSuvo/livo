import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { cn } from '@/lib/utils';
import { Container } from '@/components/shared/Container';

export interface ProductPageHeaderProps {
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
  imageAlt?: string;
  bgColor?: string;
  titleColor?: string;
  descColor?: string;
  className?: string;
  contentClassName?: string;
}

export const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  bgColor = 'bg-[#f4f2ee]',
  titleColor = 'text-neutral-900',
  descColor = 'text-neutral-600',
  className,
  contentClassName,
}) => {
  return (
    <header className={cn('w-full overflow-hidden relative', className)}>
      {/* =========================
          DESKTOP / TABLET
          ========================= */}
      <div className="hidden md:flex min-h-80 lg:min-h-90">
        {/* Left Side - Background */}
        <div className={cn('flex-1', bgColor)} />

        {/* Right Side - Hero Image */}
        <div className="relative flex-1">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            priority
            sizes="(max-width: 1024px) 50vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Desktop Text Overlay */}
      <div className="hidden md:flex absolute inset-0 z-10 items-center pointer-events-none">
        <Container className="w-full">
          <div className="grid grid-cols-2">
            {/* Left Side - Content */}
            <div className={cn('max-w-xl pr-6 lg:pr-12 pointer-events-auto', contentClassName)}>
              <h1
                className={cn(
                  'text-3xl lg:text-5xl font-medium tracking-tight mb-4 lg:mb-6',
                  titleColor
                )}
              >
                {title}
              </h1>

              <p className={cn('text-sm lg:text-base font-light leading-relaxed', descColor)}>
                {description}
              </p>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================
          MOBILE
          Image TOP → Content BELOW
          ========================= */}
      <div className="flex flex-col md:hidden">
        {/* Hero Image */}
        <div className="relative w-full h-44">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Content */}
        <div className={cn('w-full px-5 py-8 sm:px-8 sm:py-10', bgColor)}>
          <Container className="w-full px-0">
            <div className={cn('max-w-xl', contentClassName)}>
              <h1
                className={cn('text-2xl sm:text-3xl font-medium tracking-tight mb-4', titleColor)}
              >
                {title}
              </h1>

              <p className={cn('text-sm sm:text-base font-light leading-relaxed', descColor)}>
                {description}
              </p>
            </div>
          </Container>
        </div>
      </div>
    </header>
  );
};

export default ProductPageHeader;
