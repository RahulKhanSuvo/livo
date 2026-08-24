'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Skeleton } from '@/components/ui/skeleton';

import { Container } from '../shared/Container';
import ProductSlider from '../shared/ProductSlider';

import { designSliderQuery, type DesignEditTab } from '@/queries/design-slider.query';

export const DesignEditSlider = () => {
  const [activeTab, setActiveTab] = useState<DesignEditTab>('sofas');

  const { data, isLoading } = useQuery(designSliderQuery(activeTab));

  const products = data?.data?.products ?? [];

  return (
    <section className="w-full overflow-x-hidden py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 mb-4">
          <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
            Seasonal Spotlight
          </span>

          <h2 className="text-4xl sm:text-5xl font-medium text-neutral-900 tracking-tight">
            The Design Edit
          </h2>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as DesignEditTab)}
          className="w-full"
        >
          <TabsList className="bg-transparent p-0 h-auto gap-6 mb-8 justify-start border-none">
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

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="aspect-square w-full rounded-sm" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500">
              No products found in this category.
            </div>
          ) : (
            <ProductSlider products={products} />
          )}
        </Tabs>
      </Container>
    </section>
  );
};

export default DesignEditSlider;
