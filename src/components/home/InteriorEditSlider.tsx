'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { interiorSliderQuery, type InteriorTab } from '@/queries/interior-slider.query';
import ProductSlider from '../shared/ProductSlider';

export const InteriorEditSlider = () => {
  const [activeTab, setActiveTab] = useState<InteriorTab>('most-wanted');

  const { data, isLoading } = useQuery(interiorSliderQuery(activeTab));

  const products = data?.data?.products ?? [];

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as InteriorTab)}
      className="w-full"
    >
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
        <ProductSlider products={products} basePath="/product" />
      )}
    </Tabs>
  );
};

export default InteriorEditSlider;
