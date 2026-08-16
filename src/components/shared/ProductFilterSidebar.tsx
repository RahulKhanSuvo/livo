'use client';

import React, { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams, useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '../ui/scroll-area';
import { getFilterOptionsAction } from '@/actions/furniture/getFilterOptions';
import { FilterGroup } from '@/data/filter-sidebar.data';

export interface SelectedFilter {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionLabel: string;
}

export const ProductFilterSidebar = ({
  category: propCategory,
  subcategory: propSubcategory,
}: {
  category?: string;
  subcategory?: string;
} = {}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeParams = useParams();
  const [, startTransition] = useTransition();

  const category = propCategory || (routeParams?.category as string) || undefined;
  const subcategory = propSubcategory || (routeParams?.subcategory as string) || undefined;

  // Query dynamic filter options directly from database server action filtered by category and subcategory
  const { data: filterGroupsResponse, isLoading } = useQuery({
    queryKey: ['filter-options', category, subcategory],
    queryFn: () => getFilterOptionsAction({ category, subcategory }),
    staleTime: 1000 * 60 * 10,
  });

  const filterGroups: FilterGroup[] = filterGroupsResponse?.data || [];

  // Parse currently selected filters from URL searchParams
  const getSelectedFilters = (): SelectedFilter[] => {
    const selected: SelectedFilter[] = [];

    // Brands
    const brandParam = searchParams.get('brand');
    if (brandParam) {
      const brandGroup = filterGroups.find((g) => g.id === 'brand');
      brandParam.split(',').forEach((bId) => {
        const option = brandGroup?.options.find((o) => o.id === bId || o.label === bId);
        selected.push({
          groupId: 'brand',
          groupTitle: 'Brand',
          optionId: bId,
          optionLabel: option?.label || bId,
        });
      });
    }

    // Materials
    const materialParam = searchParams.get('material');
    if (materialParam) {
      const matGroup = filterGroups.find((g) => g.id === 'material');
      materialParam.split(',').forEach((mId) => {
        const option = matGroup?.options.find((o) => o.id === mId || o.label === mId);
        selected.push({
          groupId: 'material',
          groupTitle: 'Material',
          optionId: mId,
          optionLabel: option?.label || mId,
        });
      });
    }

    // Product Types
    const ptParam = searchParams.get('productType');
    if (ptParam) {
      const ptGroup = filterGroups.find((g) => g.id === 'product-type');
      ptParam.split(',').forEach((ptId) => {
        const option = ptGroup?.options.find((o) => o.id === ptId || o.label === ptId);
        selected.push({
          groupId: 'product-type',
          groupTitle: 'Product Type',
          optionId: ptId,
          optionLabel: option?.label || ptId,
        });
      });
    }

    // Availability
    const stockParam = searchParams.get('inStock');
    if (stockParam === 'true') {
      selected.push({
        groupId: 'availability',
        groupTitle: 'Availability',
        optionId: 'in-stock',
        optionLabel: 'In Stock',
      });
    } else if (stockParam === 'false') {
      selected.push({
        groupId: 'availability',
        groupTitle: 'Availability',
        optionId: 'pre-order',
        optionLabel: 'Out of Stock / Pre-order',
      });
    }

    // Price
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice === '0' && maxPrice === '500') {
      selected.push({
        groupId: 'price',
        groupTitle: 'Price',
        optionId: 'under-500',
        optionLabel: 'Under $500',
      });
    } else if (minPrice === '500' && maxPrice === '1000') {
      selected.push({
        groupId: 'price',
        groupTitle: 'Price',
        optionId: '500-1000',
        optionLabel: '$500 - $1,000',
      });
    } else if (minPrice === '1000') {
      selected.push({
        groupId: 'price',
        groupTitle: 'Price',
        optionId: 'over-1000',
        optionLabel: 'Over $1,000',
      });
    }

    return selected;
  };

  const selectedFilters = getSelectedFilters();

  // Helper to update search params in URL
  const updateUrlParams = (updater: (params: URLSearchParams) => void) => {
    const params = new URLSearchParams(searchParams.toString());
    // Reset page to 1 whenever filters change
    params.set('page', '1');
    updater(params);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Toggle single filter selection
  const handleFilterToggle = (groupId: string, optionId: string) => {
    updateUrlParams((params) => {
      if (groupId === 'brand' || groupId === 'material' || groupId === 'product-type') {
        const paramKey = groupId === 'product-type' ? 'productType' : groupId;
        const current = params.get(paramKey)?.split(',').filter(Boolean) || [];
        if (current.includes(optionId)) {
          const next = current.filter((id) => id !== optionId);
          if (next.length > 0) params.set(paramKey, next.join(','));
          else params.delete(paramKey);
        } else {
          params.set(paramKey, [...current, optionId].join(','));
        }
      } else if (groupId === 'availability') {
        const currentInStock = params.get('inStock');
        if (optionId === 'in-stock') {
          if (currentInStock === 'true') params.delete('inStock');
          else params.set('inStock', 'true');
        } else if (optionId === 'pre-order') {
          if (currentInStock === 'false') params.delete('inStock');
          else params.set('inStock', 'false');
        }
      } else if (groupId === 'price') {
        const currentMin = params.get('minPrice');
        const currentMax = params.get('maxPrice');

        if (optionId === 'under-500') {
          if (currentMax === '500') {
            params.delete('minPrice');
            params.delete('maxPrice');
          } else {
            params.set('minPrice', '0');
            params.set('maxPrice', '500');
          }
        } else if (optionId === '500-1000') {
          if (currentMin === '500' && currentMax === '1000') {
            params.delete('minPrice');
            params.delete('maxPrice');
          } else {
            params.set('minPrice', '500');
            params.set('maxPrice', '1000');
          }
        } else if (optionId === 'over-1000') {
          if (currentMin === '1000' && !currentMax) {
            params.delete('minPrice');
            params.delete('maxPrice');
          } else {
            params.set('minPrice', '1000');
            params.delete('maxPrice');
          }
        }
      }
    });
  };

  const handleRemoveFilter = (groupId: string, optionId: string) => {
    handleFilterToggle(groupId, optionId);
  };

  const handleRemoveAll = () => {
    updateUrlParams((params) => {
      params.delete('brand');
      params.delete('material');
      params.delete('productType');
      params.delete('inStock');
      params.delete('minPrice');
      params.delete('maxPrice');
      params.set('page', '1');
    });
  };

  const getGroupActiveCount = (groupId: string) => {
    return selectedFilters.filter((f) => f.groupId === groupId).length;
  };

  if (isLoading) {
    return (
      <aside className="bg-white text-neutral-900 pt-5 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse space-y-2 py-3 border-b">
            <div className="h-4 bg-neutral-100 rounded w-1/3" />
            <div className="h-3 bg-neutral-100 rounded w-2/3" />
          </div>
        ))}
      </aside>
    );
  }

  return (
    <aside className="bg-white text-neutral-900 pt-5">
      {/* Top Filter Header Bar (Shows when filters are active) */}
      {selectedFilters.length > 0 && (
        <div className="mb-6 flex flex-col items-start gap-3 px-3">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">Filter</span>
            <button
              type="button"
              onClick={handleRemoveAll}
              className="text-xs text-neutral-900 underline underline-offset-2 hover:text-neutral-600 transition-colors cursor-pointer"
            >
              Remove all
            </button>
          </div>

          {/* Filter Badges / Chips */}
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filter) => (
              <span
                key={`${filter.groupId}-${filter.optionId}`}
                className="inline-flex items-center gap-1.5 rounded-none bg-[#eae8e4] px-2.5 py-1 text-xs font-normal text-neutral-900"
              >
                {filter.groupTitle}: {filter.optionLabel}
                <button
                  type="button"
                  onClick={() => handleRemoveFilter(filter.groupId, filter.optionId)}
                  className="text-neutral-700 hover:text-neutral-900 focus:outline-none cursor-pointer"
                  aria-label={`Remove filter ${filter.optionLabel}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Accordion Filter Sections */}
      <ScrollArea>
        <div>
          <Accordion
            type="multiple"
            defaultValue={['brand']}
            className="w-full border-none bg-white"
          >
            {filterGroups.map((group) => {
              const activeCount = getGroupActiveCount(group.id);
              return (
                <AccordionItem
                  className={'bg-white data-open:bg-white'}
                  key={group.id}
                  value={group.id}
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-base font-normal">
                    <span className="flex items-center gap-1">
                      <span>{group.title}</span>
                      {activeCount > 0 && (
                        <span className="text-neutral-400 font-light">({activeCount})</span>
                      )}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent className={'bg-white'}>
                    <div className="flex flex-col space-y-3 pt-1">
                      {group.options.map((option) => {
                        const isChecked = selectedFilters.some(
                          (f) => f.groupId === group.id && f.optionId === option.id
                        );

                        return (
                          <label
                            key={option.id}
                            className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => handleFilterToggle(group.id, option.id)}
                              className="h-4 w-4 rounded-none border-neutral-300 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-neutral-900"
                            />
                            <span className="font-light text-xs sm:text-sm">
                              {option.label} ({option.count})
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </ScrollArea>
    </aside>
  );
};

export default ProductFilterSidebar;
