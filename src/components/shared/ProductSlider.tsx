'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import ProductCard, { ProductCardItem } from '../home/ProductCard';
import { HugeiconsIcon } from '@hugeicons/react';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import ArrowRight02Icon from '@hugeicons/core-free-icons/ArrowRight02Icon';

interface ProductSliderProps {
  products: ProductCardItem[];
  basePath?: string;
}

export default function ProductSlider({ products, basePath = '/product' }: ProductSliderProps) {
  return (
    <div className="relative group/swiper">
      <Swiper
        modules={[Scrollbar, Navigation]}
        spaceBetween={9}
        slidesPerView={1.2}
        scrollbar={{
          draggable: true,
          el: '.custom-swiper-scrollbar',
        }}
        navigation={{
          prevEl: '.swiper-prev',
          nextEl: '.swiper-next',
        }}
        breakpoints={{
          640: {
            slidesPerView: 2.2,
            spaceBetween: 8,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 8,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 8,
          },
        }}
        className="w-full pb-8! overflow-visible!"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} basePath={basePath} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="swiper-prev absolute left-2 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all duration-300 opacity-0 group-hover/swiper:opacity-100">
        <HugeiconsIcon icon={ArrowLeft02Icon} size="20" />
      </button>
      <button className="swiper-next absolute right-2 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-neutral-100 cursor-pointer transition-all duration-300 opacity-0 group-hover/swiper:opacity-100">
        <HugeiconsIcon icon={ArrowRight02Icon} size="20" />
      </button>
    </div>
  );
}
