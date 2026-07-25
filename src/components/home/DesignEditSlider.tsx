'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { productsData } from './productsData';
import { Container } from '../shared/Container';
import ProductCard from './ProductCard';

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
        <div className="space-y-3 mb-8">
          <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
            Seasonal Spotlight
          </span>
          <h2 className="text-4xl sm:text-5xl font-light text-neutral-900 tracking-tight">
            The Design Edit
          </h2>
        </div>

        {/* Tabs & Swiper Section */}
        <Tabs defaultValue="new" onValueChange={setActiveTab} className="w-full">
          {/* Minimalist Tab Navigation */}
          <TabsList className="bg-transparent p-0 h-auto gap-6 mb-8 justify-start border-none">
            <TabsTrigger
              value="new"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500 data-[state=active]:text-neutral-900 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 bg-transparent data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              New In
            </TabsTrigger>
            <TabsTrigger
              value="sofas"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500 data-[state=active]:text-neutral-900 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 bg-transparent data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Sofas
            </TabsTrigger>
            <TabsTrigger
              value="tables"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500 data-[state=active]:text-neutral-900 data-[state=active]:border-b-2 data-[state=active]:border-neutral-900 bg-transparent data-[state=active]:shadow-none data-[state=active]:bg-transparent"
            >
              Tables
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {/* !overflow-visible allows slides to bleed seamlessly off the right side */}
            <Swiper
              modules={[Scrollbar]}
              spaceBetween={20}
              slidesPerView={1.2}
              scrollbar={{ draggable: true, el: '.custom-swiper-scrollbar' }}
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
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};
export default DesignEditSlider;
