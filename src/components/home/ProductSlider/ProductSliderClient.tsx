'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighFreeIcons, VolumeOffFreeIcons } from '@hugeicons/core-free-icons';
import ArrowRight02Icon from '@hugeicons/core-free-icons/ArrowRight02Icon';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import type { PublicProductSliderItem } from '@/actions/content/product-slider/product-slider.type';

const priceFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ProductSliderClient({ items }: { items: PublicProductSliderItem[] }) {
  const [activeIndex, setActiveIndex] = useState(() => Math.min(2, Math.max(0, items.length - 1)));
  const [isMuted, setIsMuted] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex) {
        video.muted = isMuted;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, items.length]);

  const toggleSound = () => {
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      const nextMutedState = !isMuted;
      activeVideo.muted = nextMutedState;
      setIsMuted(nextMutedState);
    }
  };

  if (items.length === 0) return null;

  const SLIDES_PER_VIEW = 4;
  const MIN_LOOP_SLIDES = SLIDES_PER_VIEW * 2 + 1;

  // If there are too few slides for Swiper's loop, duplicate the items so the
  // carousel can still loop seamlessly (instead of disabling loop + warning).
  const displayItems =
    items.length > 0 && items.length < MIN_LOOP_SLIDES
      ? Array.from({ length: MIN_LOOP_SLIDES }, (_, i) => items[i % items.length])
      : items;

  const loopEnabled = displayItems.length >= MIN_LOOP_SLIDES;

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div>
        <h2 className="text-center py-4 text-2xl font-medium">Inspiration</h2>
      </div>
      <div className="px-0 relative group/swiper">
        <Swiper
          modules={[Navigation, Pagination]}
          centeredSlides={true}
          loop={loopEnabled}
          spaceBetween={16}
          slidesPerView={4}
          slideToClickedSlide={true}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          pagination={{
            clickable: true,
            bulletClass:
              'inline-block size-[8px] bg-neutral-300 rounded-full cursor-pointer transition-all mx-1',
            bulletActiveClass: '!bg-neutral-800',
          }}
          navigation={{
            prevEl: '.product-slider-prev',
            nextEl: '.product-slider-next',
          }}
          className="product-swiper pb-12!"
        >
          {displayItems.map((slide, index) => {
            return (
              <SwiperSlide key={`${slide.id}-${index}`}>
                {({ isActive }) => (
                  <div className="flex flex-col w-full items-center justify-end">
                    {/* Video Container - Height-only Transition */}
                    <div
                      className={`relative w-full aspect-[0.6] overflow-hidden transition-all flex flex-col items-center justify-center`}
                    >
                      <div
                        className={`w-full ${isActive ? 'h-full' : 'h-[80%]'} transition-[height] duration-300 ease-in-out`}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el;
                          }}
                          src={slide.mediaUrl}
                          loop
                          muted={isMuted}
                          playsInline
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Mute Control - Active Slide Only */}
                      {isActive && (
                        <button
                          type="button"
                          onClick={toggleSound}
                          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-opacity hover:bg-black/70 z-10"
                          aria-label="Toggle sound"
                        >
                          <HugeiconsIcon
                            icon={isMuted ? VolumeOffFreeIcons : VolumeHighFreeIcons}
                            size={16}
                            strokeWidth={1.8}
                          />
                        </button>
                      )}
                    </div>

                    {/* Product Card Container - Active Slide Only */}
                    <div
                      className={`w-full transition-all duration-300 ${
                        isActive
                          ? 'opacity-100 mt-4 pointer-events-auto'
                          : 'opacity-0 mt-4 overflow-hidden pointer-events-none'
                      }`}
                    >
                      <div className="border border-neutral-200 bg-white p-3">
                        <Link href={slide.product.href} className="flex items-center gap-6 group">
                          {/* Product Thumbnail */}
                          <div className="relative size-24 shrink-0 bg-[#f7f7f7] overflow-hidden">
                            {slide.product.image && (
                              <Image
                                src={slide.product.image}
                                alt={slide.product.name}
                                fill
                                className="object-contain p-1 group-hover:scale-105 transition-transform"
                              />
                            )}
                          </div>

                          {/* Product Metadata */}
                          <div className="flex flex-col min-w-0 text-left">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                              {slide.product.brand}
                            </span>
                            <h4 className="font-normal text-neutral-900 truncate group-hover:underline">
                              {slide.product.name}
                            </h4>
                            <span className="text-base font-normal text-neutral-900 pt-0.5">
                              {priceFmt.format(slide.product.price)}
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className="product-slider-prev absolute left-2 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer transition-all duration-300 opacity-0 group-hover/swiper:opacity-100 shadow-sm">
          <HugeiconsIcon icon={ArrowLeft02Icon} size="20" />
        </button>
        <button className="product-slider-next absolute right-2 top-[35%] -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:bg-white cursor-pointer transition-all duration-300 opacity-0 group-hover/swiper:opacity-100 shadow-sm">
          <HugeiconsIcon icon={ArrowRight02Icon} size="20" />
        </button>
      </div>
    </section>
  );
}
