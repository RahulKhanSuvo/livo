'use client';
import DataTable from '@/components/shared/data-table';
import { useQuery } from '@tanstack/react-query';

const OrdersPage = ({
  resolvedParams,
}: {
  resolvedParams: {
    [key: string]: string | string[] | undefined;
  };
}) => {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', resolvedParams],
    queryFn: () => {},
  });
  return (
    <>
      <DataTable data={orders} isLoading={isLoading} />
    </>
  );
};
export default OrdersPage;
