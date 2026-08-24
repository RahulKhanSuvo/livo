import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

export interface ProductsQueryParams {
  page: number;
  limit: number;
  search: string;
  status?: 'ACTIVE' | 'DEACTIVATED';
  brand?: string;
  stock?: string;
  category?: string;
}

export const productsQuery = ({
  page,
  limit,
  search,
  status,
  brand,
  stock,
  category,
}: ProductsQueryParams) => ({
  queryKey: [
    'products',
    page,
    limit,
    search,
    status ?? '',
    brand ?? '',
    stock ?? '',
    category ?? '',
  ],

  queryFn: () =>
    getAllFurnitureAction({
      page,
      limit,
      search,
      ...(status ? { status } : {}),
      ...(brand ? { brand } : {}),
      ...(stock ? { inStock: stock } : {}),
      ...(category ? { category } : {}),
      sortBy: 'createdAt',
      sortOrder: 'desc',
    }),

  staleTime: 1000 * 60 * 5,
});
