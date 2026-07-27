'use client';

import React, { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { filterGroupsData } from '@/data/filter-sidebar.data';
import { ScrollArea } from '../ui/scroll-area';

export interface SelectedFilter {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionLabel: string;
}

export const ProductFilterSidebar = () => {
  // Store selected filters state
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([
    {
      groupId: 'brand',
      groupTitle: 'Brand',
      optionId: 'nap',
      optionLabel: 'NAP',
    },
  ]);

  // Handle Checkbox Change
  const handleFilterToggle = (
    groupId: string,
    groupTitle: string,
    optionId: string,
    optionLabel: string
  ) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((f) => f.groupId === groupId && f.optionId === optionId);
      if (exists) {
        return prev.filter((f) => !(f.groupId === groupId && f.optionId === optionId));
      } else {
        return [...prev, { groupId, groupTitle, optionId, optionLabel }];
      }
    });
  };

  // Remove single filter tag
  const handleRemoveFilter = (groupId: string, optionId: string) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => !(f.groupId === groupId && f.optionId === optionId))
    );
  };

  // Remove all active filters
  const handleRemoveAll = () => {
    setSelectedFilters([]);
  };

  // Count active selections per group
  const getGroupActiveCount = (groupId: string) => {
    return selectedFilters.filter((f) => f.groupId === groupId).length;
  };

  return (
    <aside className="w-full max-w-70 bg-white text-neutral-900 p-2 select-none sticky top-20 z-20">
      {/* Top Filter Header Bar (Shows when filters are active) */}
      {selectedFilters.length > 0 && (
        <div className="mb-6 flex flex-col items-start gap-3">
          <div className="flex w-full items-center justify-between">
            <span className="text-sm font-medium text-neutral-900">Filter</span>
            <button
              type="button"
              onClick={handleRemoveAll}
              className="text-xs text-neutral-900 underline underline-offset-2 hover:text-neutral-600 transition-colors"
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
                  className="text-neutral-700 hover:text-neutral-900 focus:outline-none"
                  aria-label={`Remove filter ${filter.optionLabel}`}
                >
                  X
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
            defaultValue={['brand']} // 'brand' open by default as in screenshot
            className="w-full border-none bg-white"
          >
            {filterGroupsData.map((group) => {
              const activeCount = getGroupActiveCount(group.id);

              return (
                <AccordionItem className={'bg-white'} key={group.id} value={group.id}>
                  <AccordionTrigger className="hover:no-underline py-3.5 text-base font-normal">
                    <span className="flex items-center gap-1">
                      <span>{group.title}</span>
                      {activeCount > 0 && (
                        <span className="text-neutral-400 font-light">({activeCount})</span>
                      )}
                    </span>
                  </AccordionTrigger>

                  <AccordionContent>
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
                              onCheckedChange={() =>
                                handleFilterToggle(group.id, group.title, option.id, option.label)
                              }
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
