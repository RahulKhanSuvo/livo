'use client';

import React from 'react';
import Image, { StaticImageData } from 'next/image';

interface ProductGalleryProps {
  imageSrc: string | StaticImageData;
  title: string;
  badgeText?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  imageSrc,
  title,
  badgeText = 'Trending',
}) => {
  return (
    <div className="relative w-full aspect-square bg-[#f5f5f3] rounded-sm overflow-hidden flex items-center justify-center p-8">
      {/* Badge */}
      {badgeText && (
        <span className="absolute top-4 left-4 z-10 rounded-full bg-[#1e40af] px-3 py-1 text-[11px] font-medium text-white shadow-sm">
          {badgeText}
        </span>
      )}

      {/* Hero Product Image */}
      <div className="relative w-full h-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
};
