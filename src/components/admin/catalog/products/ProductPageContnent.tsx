'use client';

import { useState } from 'react';
import { useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

import { useServerPagination } from '@/hooks/useServerPagination';
import { updateProductStatusAction } from '@/actions/products/updateProductStatusAction';

import { productsQuery } from '@/queries/products.query';

import { ProductDeleteModal } from './product-delete-modal';
import { ProductsFilterBar } from './ProductsFilterBar';
import { ProductsGrid } from './ProductsGrid';

function ProductPageContent() {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string | undefined>(undefined);

  // --------------------------------------------------
  // Pagination
  // --------------------------------------------------

  const { paginationState, isPending, handlePaginationChange, navigate } = useServerPagination({
    searchParams,
    defaultPage: 1,
    defaultLimit: 10,
  });

  const currentPage = paginationState.pageIndex + 1;
  const currentLimit = paginationState.pageSize;

  // --------------------------------------------------
  // Filters
  // --------------------------------------------------

  const search = searchParams.get('search') ?? '';
  const statusParam = searchParams.get('status');
  const brand = searchParams.get('brand') ?? '';
  const stock = searchParams.get('stock') ?? '';
  const category = searchParams.get('category') ?? '';

  const status =
    statusParam === 'ACTIVE' || statusParam === 'DEACTIVATED' ? statusParam : undefined;

  // --------------------------------------------------
  // Products Query (suspense)
  // --------------------------------------------------

  const { data: products, isFetching } = useQuery({
    ...productsQuery({
      page: currentPage,
      limit: currentLimit,
      search,
      status,
      brand: brand || undefined,
      stock: stock || undefined,
      category: category || undefined,
    }),
    placeholderData: keepPreviousData,
  });

  // --------------------------------------------------
  // Product Status
  // --------------------------------------------------

  async function handleSetStatus(id: string, status: 'ACTIVE' | 'DEACTIVATED') {
    const res = await updateProductStatusAction({
      id,
      status,
    });

    if (res.success) {
      toast.success(status === 'ACTIVE' ? 'Product activated' : 'Product deactivated');

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['products'] }),
        queryClient.invalidateQueries({ queryKey: ['product-stats'] }),
      ]);

      return;
    }

    toast.error(res.message || 'Failed to update product status');
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      <ProductsFilterBar onNavigate={navigate} />

      <ProductsGrid
        products={products?.data?.products ?? []}
        total={products?.data?.total ?? 0}
        page={currentPage}
        limit={currentLimit}
        isPending={isPending || isFetching}
        onDelete={(id, name) => {
          setDeleteId(id);
          setDeleteName(name);
        }}
        onSetStatus={handleSetStatus}
        onPageChange={(s) => handlePaginationChange(s)}
      />

      <ProductDeleteModal
        productId={deleteId}
        productName={deleteName}
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteId(null);
            setDeleteName(undefined);
          }
        }}
        onDeleted={async () => {
          await Promise.all([
            queryClient.invalidateQueries({ queryKey: ['products'] }),
            queryClient.invalidateQueries({ queryKey: ['product-stats'] }),
          ]);
        }}
      />
    </>
  );
}

export default ProductPageContent;
