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
import { queryOptions } from '@tanstack/react-query';
import { getAdminAllFurniture } from '@/actions/furniture/getAdminAllFurniture';

export const AdminProductsQuery = (
  page = 1,
  limit = 8,
  search?: string,
  status?: 'ACTIVE' | 'DEACTIVATED',
  sort?: 'newest' | 'oldest' | 'price_desc' | 'price_asc'
) =>
  queryOptions({
    queryKey: ['products', { page, limit, search, status, sort }],
    queryFn: () => getAdminAllFurniture({ page, limit, search, status, sort: sort ?? 'newest' }),
  });
