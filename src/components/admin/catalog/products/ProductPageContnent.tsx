'use client';

import { DataTable } from '@/components/shared/data-table';
import { useQuery } from '@tanstack/react-query';
import { productColumns } from './columns';
import { useServerPagination } from '@/hooks/useServerPagination';
import { useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';

function ProductPageContent() {
  // 2. Pass currentPage & currentLimit to queryKey and queryFn
  const searchParams = useSearchParams();
  const { paginationState, handlePaginationChange, isPending } = useServerPagination({
    searchParams: searchParams,
    defaultPage: 1,
    defaultLimit: 2,
  });
  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;

  const { data: products } = useQuery({
    queryKey: ['products', currentPage, currentLimit],
    queryFn: () =>
      getAllFurnitureAction({
        page: currentPage,
        limit: currentLimit,
        search: '',
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  return (
    <DataTable
      isPending={isPending}
      pagination={{
        state: paginationState,
        onPaginationChange: handlePaginationChange,
        totalRows: products?.data?.total || 0,
      }}
      columns={productColumns}
      data={products?.data?.products || []}
      tableKey="product-table"
    />
  );
}

export default ProductPageContent;
