import { queryOptions } from '@tanstack/react-query';
import { getAllOrdersAction } from '@/actions/order/getAllOrdersAction';
import { OrderQuery } from '@/actions/order/order.validation';

export const ordersQueryOptions = (query: OrderQuery) =>
  queryOptions({
    queryKey: ['orders', query],
    queryFn: () => getAllOrdersAction(query),
  });
