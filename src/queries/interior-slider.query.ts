import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

export type InteriorTab = 'most-wanted' | 'storage' | 'accessories';

export const interiorSliderQuery = (activeTab: InteriorTab) => ({
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

  staleTime: 1000 * 60 * 5,
});
