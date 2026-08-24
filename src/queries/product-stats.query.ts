import { getProductStatsAction } from '@/actions/products/getProductStatsAction';

export const productStatsQuery = () => ({
  queryKey: ['product-stats'],

  queryFn: () => getProductStatsAction(),

  staleTime: 5 * 60 * 1000,
});
