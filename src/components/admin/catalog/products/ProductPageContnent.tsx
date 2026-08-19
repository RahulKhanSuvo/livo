'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useServerPagination } from '@/hooks/useServerPagination';
import { useSearchParams } from 'next/navigation';
import { getAllFurnitureAction } from '@/actions/furniture/getAllFurniture';
import { updateProductStatusAction } from '@/actions/products/updateProductStatusAction';
import { ProductDeleteModal } from './product-delete-modal';
import { ProductsFilterBar } from './ProductsFilterBar';
import { ProductsGrid } from './ProductsGrid';

function ProductPageContent() {
  // 2. Pass currentPage & currentLimit to queryKey and queryFn
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | undefined>(undefined);

  async function handleSetStatus(id: string, status: 'ACTIVE' | 'DEACTIVATED') {
    const res = await updateProductStatusAction({ id, status });
    if (res.success) {
      toast.success(status === 'ACTIVE' ? 'Product activated' : 'Product deactivated');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } else {
      toast.error(res.message || 'Failed to update product status');
    }
  }

  const { paginationState, isPending } = useServerPagination({
    searchParams: searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });
  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;

  const search = searchParams.get('search') ?? '';
  const status = searchParams.get('status') ?? '';
  const brand = searchParams.get('brand') ?? '';
  const stock = searchParams.get('stock') ?? '';
  const category = searchParams.get('category') ?? '';

  const { data: products, isFetching } = useQuery({
    queryKey: ['products', currentPage, currentLimit, search, status, brand, stock, category],
    queryFn: () =>
      getAllFurnitureAction({
        page: currentPage,
        limit: currentLimit,
        search,
        ...(status === 'ACTIVE' || status === 'DEACTIVATED' ? { status } : {}),
        ...(brand ? { brand } : {}),
        ...(stock ? { inStock: stock } : {}),
        ...(category ? { category } : {}),
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  return (
    <>
      <ProductsFilterBar />
      <ProductsGrid
        products={products?.data?.products || []}
        total={products?.data?.total || 0}
        page={currentPage}
        limit={currentLimit}
        isPending={isPending || isFetching}
        onDelete={(id, name) => {
          setDeleteId(id);
          setDeleteName(name);
        }}
        onSetStatus={handleSetStatus}
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
