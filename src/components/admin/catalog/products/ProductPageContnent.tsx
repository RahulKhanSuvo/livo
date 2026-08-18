'use client';

import { useState } from 'react';
import { DataTable } from '@/components/shared/data-table';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { productColumns } from './columns';
import { useServerPagination } from '@/hooks/useServerPagination';
import { useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { ProductDeleteModal } from './product-delete-modal';

function ProductPageContent() {
  // 2. Pass currentPage & currentLimit to queryKey and queryFn
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | undefined>(undefined);

  const { paginationState, handlePaginationChange, isPending } = useServerPagination({
    searchParams: searchParams,
    defaultPage: 1,
    defaultLimit: 10,
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
    <>
      <DataTable
        isPending={isPending}
        pagination={{
          state: paginationState,
          onPaginationChange: handlePaginationChange,
          totalRows: products?.data?.total || 0,
        }}
        columns={productColumns({
          onDelete: (id, name) => {
            setDeleteId(id);
            setDeleteName(name);
          },
        })}
        data={products?.data?.products || []}
        tableKey="product-table"
      />

      <ProductDeleteModal
        productId={deleteId}
        productName={deleteName}
        open={!!deleteId}
        onOpenChange={(o) => {
          if (!o) setDeleteId(null);
        }}
        onDeleted={() => queryClient.invalidateQueries({ queryKey: ['products'] })}
      />
    </>
  );
}

export default ProductPageContent;
