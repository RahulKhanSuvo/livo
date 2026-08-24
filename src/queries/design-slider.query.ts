import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

export type DesignEditTab = 'sofas' | 'tables' | 'chairs';

export const designSliderQuery = (activeTab: DesignEditTab) => ({
  queryKey: ['products', 'design-slider', activeTab],

  queryFn: () =>
    getAllFurnitureAction({
      page: 1,
      limit: 10,
      search: '',
      subcategory: activeTab,
      sortBy: 'soldCount',
      sortOrder: 'desc',
    }),

  staleTime: 1000 * 60 * 5,
});
