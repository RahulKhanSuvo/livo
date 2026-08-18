'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useProductVariant } from './ProductVariantContext';

function getImageUrl(image: { imageUrl: string } | File): string {
  if (image instanceof File) return URL.createObjectURL(image);
  return image.imageUrl;
}

export const ProductGallery = ({ name }: { name: string }) => {
  const { variant } = useProductVariant();
  const images = variant.images;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToImage = useCallback(
    (direction: number) => {
      if (images.length <= 1) return;
      setSelectedImageIndex((i) => (i + direction + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      else if (e.key === 'ArrowLeft') goToImage(-1);
      else if (e.key === 'ArrowRight') goToImage(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, goToImage]);

  const safeIndex = images.length > 0 ? Math.min(selectedImageIndex, images.length - 1) : 0;
  const currentImage = images[safeIndex] ?? images[0];
  const heroImage = currentImage ? getImageUrl(currentImage) : null;

  return (
    <>
      <div className="flex gap-4">
        {/* Thumbnail selector — left side */}
        {images.length > 0 && (
          <div className="flex flex-col gap-2 shrink-0">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImageIndex(i)}
                aria-label={`View image ${i + 1}`}
                className={`relative h-16 w-16 rounded-sm bg-[#f5f5f3] overflow-hidden border transition-colors ${
                  i === selectedImageIndex
                    ? 'border-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                <Image
                  src={getImageUrl(img)}
                  alt={`${name} thumbnail ${i + 1}`}
                  fill
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setLightboxOpen(true);
          }}
          className="relative flex-1 aspect-square w-full bg-[#f5f5f3] rounded-sm p-8 cursor-zoom-in"
        >
          {heroImage ? (
            <Image
              src={heroImage}
              alt={name}
              fill
              priority
              className="object-contain pointer-events-none"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-sm">
              No image available
            </div>
          )}

          {/* Expand hint */}
          <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-neutral-700 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.6}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3m13 5h3a2 2 0 0 0 2-2v-3"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Full-screen image lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-5 w-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(-1);
                }}
                aria-label="Previous image"
                className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(1);
                }}
                aria-label="Next image"
                className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20"
              >
                ›
              </button>
            </>
          )}

          <div
            className="relative h-[85vh] w-[90vw] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {heroImage && (
              <Image src={heroImage} alt={name} fill className="object-contain" priority />
            )}
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/70">
              {selectedImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductGallery;
