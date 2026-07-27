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
  className?: string;
  contentClassName?: string;
}

export const ProductPageHeader: React.FC<ProductPageHeaderProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  bgColor = 'bg-[#f4f2ee]',
  className,
  contentClassName,
}) => {
  return (
    <header className={cn('w-full overflow-hidden relative', className)}>
      {/* Background Columns Layer */}
      <div className="flex min-h-80 sm:min-h-95 lg:min-h-105">
        {/* Left Side: Solid Background */}
        <div className={cn('flex-1', bgColor)} />

        {/* Right Side: Hero Image */}
        <div className="relative flex-1 min-h-65 sm:min-h-85">
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Overlay Layer: Text Content Constrained inside Container */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center">
        <Container className="w-full pointer-events-auto">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Text Details */}
            <div className={cn('max-w-xl pr-6 lg:pr-12', contentClassName)}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-neutral-900 tracking-tight mb-4 sm:mb-6">
                {title}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default ProductPageHeader;
