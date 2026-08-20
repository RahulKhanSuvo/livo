'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, Navigation } from 'swiper/modules';
import { HugeiconsIcon } from '@hugeicons/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { Container } from '../shared/Container';
import ProductCard from './ProductCard';
import ArrowRight02Icon from '@hugeicons/core-free-icons/ArrowRight02Icon';
import ArrowLeft02Icon from '@hugeicons/core-free-icons/ArrowLeft02Icon';
import { useQuery } from '@tanstack/react-query';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

export const InteriorEditSlider = () => {
  const [activeTab, setActiveTab] = useState<string>('most-wanted');

  const { data, isLoading } = useQuery({
    queryKey: ['products', 'interior-slider', activeTab],
    queryFn: async () => {
      if (activeTab === 'most-wanted') {
        const [storageRes, accessoriesRes] = await Promise.all([
          getAllFurnitureAction({
            page: 1,
            limit: 8,
            search: '',
            subcategory: 'storage',
            sortBy: 'createdAt',
            sortOrder: 'desc',
          }),
          getAllFurnitureAction({
            page: 1,
            limit: 8,
            search: '',
            subcategory: 'accessories',
            sortBy: 'createdAt',
            sortOrder: 'desc',
          }),
        ]);

        const products = [
          ...(storageRes.data?.products ?? []),
          ...(accessoriesRes.data?.products ?? []),
        ];

        return {
          success: true,
          message: 'Action executed successfully',
          data: {
            products,
            total: products.length,
            page: 1,
            limit: 10,
            hasNextPage: false,
            hasPrevPage: false,
          },
        };
      }

      return getAllFurnitureAction({
        page: 1,
        limit: 10,
        search: '',
        subcategory: activeTab,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      });
    },
  });

  const products = data?.data?.products || [];

  return (
    /* Parent container handles overflow prevention for the page */
    <section className="w-full overflow-x-hidden py-12 bg-white">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-4">
          <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
            Trusted Classics
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium text-neutral-900 tracking-tight">
            Interior Essentials
          </h2>
        </div>

        {/* Tabs & Swiper Section */}
        <Tabs defaultValue="most-wanted" onValueChange={setActiveTab} className="w-full">
          {/* Minimalist Tab Navigation */}
          <TabsList className="bg-transparent p-0 h-auto gap-6 mb-8 justify-start border-none">
            <TabsTrigger
              value="most-wanted"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Most Wanted
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Storage
            </TabsTrigger>
            <TabsTrigger
              value="accessories"
              className="p-0 pb-1 rounded-none text-base font-normal text-neutral-500"
            >
              Accessories
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse flex flex-col space-y-3">
                    <div className="bg-neutral-100 aspect-square w-full rounded-sm" />
                    <div className="h-4 bg-neutral-100 rounded w-1/2" />
                    <div className="h-4 bg-neutral-100 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="py-12 text-center text-sm text-neutral-500">
                No products found in this category.
              </div>
            ) : (
              /* !overflow-visible allows slides to bleed seamlessly off the right side */
              <div className="relative group/swiper">
                <Swiper
                  modules={[Scrollbar, Navigation]}
                  spaceBetween={9}
                  slidesPerView={1.2}
                  scrollbar={{ draggable: true, el: '.custom-swiper-scrollbar' }}
                  navigation={{
                    prevEl: '.swiper-prev',
                    nextEl: '.swiper-next',
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2.2, spaceBetween: 8 },
                    1024: { slidesPerView: 3.5, spaceBetween: 8 },
                    1280: { slidesPerView: 4, spaceBetween: 8 },
                  }}
                  className="w-full pb-8! overflow-visible!"
                >
                  {products.map((product) => (
                    <SwiperSlide key={product.id}>
                      <ProductCard product={product} basePath="/product" />
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
            )}
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};
export default InteriorEditSlider;
