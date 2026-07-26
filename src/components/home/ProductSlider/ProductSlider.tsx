'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { HugeiconsIcon } from '@hugeicons/react';
import { VolumeHighFreeIcons, VolumeOffFreeIcons } from '@hugeicons/core-free-icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { sliderData } from './product-slider.data';

export const ProductSlider = () => {
  const [activeIndex, setActiveIndex] = useState(2);
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
  }, [activeIndex, isMuted]);

  const toggleSound = () => {
    const activeVideo = videoRefs.current[activeIndex];
    if (activeVideo) {
      const nextMutedState = !isMuted;
      activeVideo.muted = nextMutedState;
      setIsMuted(nextMutedState);
    }
  };

  return (
    <section className="w-full py-12 bg-white overflow-hidden">
      <div className="px-0">
        <Swiper
          modules={[Pagination]}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          slidesPerView={4}
          slideToClickedSlide={true}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          pagination={{
            clickable: true,
            bulletClass:
              'inline-block w-1.5 h-1.5 bg-neutral-300 rounded-full cursor-pointer transition-all mx-1',
            bulletActiveClass: '!bg-neutral-800',
          }}
          className="product-swiper pb-12!"
        >
          {sliderData.map((slide, index) => {
            return (
              <SwiperSlide key={slide.id}>
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
                        <Link
                          href={slide.productCard.href}
                          className="flex items-center gap-3 group"
                        >
                          {/* Product Thumbnail */}
                          <div className="relative size-16 shrink-0 bg-[#f7f7f7] overflow-hidden">
                            <Image
                              src={slide.productCard.imageUrl}
                              alt={slide.productCard.title}
                              fill
                              className="object-contain p-1 group-hover:scale-105 transition-transform"
                            />
                          </div>

                          {/* Product Metadata */}
                          <div className="flex flex-col min-w-0 text-left">
                            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                              {slide.productCard.brand}
                            </span>
                            <h4 className="text-xs font-normal text-neutral-900 truncate group-hover:underline">
                              {slide.productCard.title}
                            </h4>
                            <span className="text-xs font-semibold text-neutral-900 pt-0.5">
                              {slide.productCard.price}
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
      </div>
    </section>
  );
};

export default ProductSlider;
