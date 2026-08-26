'use client';

import { OrderQuery } from '@/actions/order/order.validation';
import { ordersQueryOptions } from '@/queries/orders.query';
import { useQuery } from '@tanstack/react-query';

const OrdersPage = ({ query }: { query: OrderQuery }) => {
  const { data: orders, isLoading } = useQuery(ordersQueryOptions(query));

  console.log('orders', orders);

  return (
    <>
      <div></div>
    </>
  );
};

export default OrdersPage;
