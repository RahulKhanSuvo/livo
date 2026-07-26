'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { Container } from '../shared/Container';
import ProductCard from './ProductCard';
import { productsData } from './productsData';

export const DesignEditSlider = () => {
  const [activeTab, setActiveTab] = useState<string>('new');

  const filteredProducts = productsData.filter((product) => {
    if (activeTab === 'new') return true;
    return product.category === activeTab;
  });

  return (
    /* Parent container handles overflow prevention for the page */
    <section className="w-full overflow-x-hidden py-12 bg-white">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-4">
          <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
            Seasonal Spotlight
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium text-neutral-900 tracking-tight">
            The Design Edit
          </h2>
        </div>

        {/* Tabs & Swiper Section */}
        <Tabs defaultValue="new" onValueChange={setActiveTab} className="w-full">
          {/* Minimalist Tab Navigation */}
          <TabsList className="bg-transparent p-0 h-auto gap-6 mb-8 justify-start border-none">
            <TabsTrigger
              value="new"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              New In
            </TabsTrigger>
            <TabsTrigger
              value="sofas"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Sofas
            </TabsTrigger>
            <TabsTrigger
              value="tables"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Tables
            </TabsTrigger>
            <TabsTrigger
              value="chairs"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Chairs
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {/* !overflow-visible allows slides to bleed seamlessly off the right side */}
            <div className="relative">
              <Swiper
                modules={[Scrollbar, Navigation]}
                spaceBetween={20}
                slidesPerView={1.2}
                scrollbar={{ draggable: true, el: '.custom-swiper-scrollbar' }}
                navigation={{
                  prevEl: '.swiper-prev',
                  nextEl: '.swiper-next',
                }}
                breakpoints={{
                  640: { slidesPerView: 2.2, spaceBetween: 24 },
                  1024: { slidesPerView: 3.5, spaceBetween: 24 },
                  1280: { slidesPerView: 4.2, spaceBetween: 24 },
                }}
                className="w-full pb-8! overflow-visible!"
              >
                {filteredProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-100 transition-colors swiper-button-disabled:!hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button className="swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-neutral-100 transition-colors swiper-button-disabled:!hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};
export default DesignEditSlider;
