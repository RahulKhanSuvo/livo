'use client';

import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { testimonialsData } from './data/testimonials.data';
import { Container } from '../shared/Container';

export const TestimonialsSlider = () => {
  return (
    <section className="w-full bg-white py-16 sm:pt-24 border-t border-neutral-100">
      <Container>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={32}
          slidesPerView={1.1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          pagination={{
            clickable: true,
            bulletClass:
              'inline-block w-2 h-2 bg-neutral-300 rounded-full cursor-pointer transition-all mx-1',
            bulletActiveClass: '!bg-neutral-800',
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.1,
              spaceBetween: 32,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
          className="testimonials-swiper pb-14!"
        >
          {testimonialsData.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="flex flex-col justify-between h-full text-left">
                {/* Content Top */}
                <div>
                  <h3 className="text-lg sm:text-xl font-medium text-neutral-900 mb-2.5">
                    {item.title}
                  </h3>
                  <p className=" sm:text-sm text-neutral-600 font-light leading-relaxed">
                    {item.review}
                  </p>
                </div>

                {/* Author & Product Footer */}
                <div className="mt-8 flex items-center gap-3">
                  {/* Round Product Thumbnail */}
                  <div className="relative h-12 w-12 shrink-0 rounded-full bg-[#f6f6f4] p-1 overflow-hidden flex items-center justify-center">
                    <Image src={item.productImage} alt={item.title} fill className="object-cover" />
                  </div>

                  {/* Author Name + Star Rating */}
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-neutral-400 font-light mb-1">
                      - {item.author}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <HugeiconsIcon key={i} icon={StarIcon} size={12} className="fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TestimonialsSlider;
