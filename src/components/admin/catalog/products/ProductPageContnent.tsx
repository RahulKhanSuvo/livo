'use client';

import { useRouter } from 'next/navigation';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ProductsGrid } from './ProductsGrid';
import { AdminProductsQuery } from '@/queries/products.query';
import { AdminValidationType } from '@/actions/furniture/furniture.validation';
import { ProductsToolbar } from './ProductsToolbar';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

function ProductPageContent({ page, limit, search, status, sort }: AdminValidationType) {
  const router = useRouter();

  const { data: response } = useSuspenseQuery(
    AdminProductsQuery(page, limit, search, status, sort)
  );

  const products = response?.data?.data ?? [];
  const totalPages = response?.data?.pagination?.totalPages ?? 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (status) params.set('status', status);
    if (sort) params.set('sort', sort);
    params.set('page', newPage.toString());
    params.set('limit', limit.toString());
    router.push(`/admin/catalog/products?${params.toString()}`);
  };

  // Build visible page numbers: always show first, last, current ±1, with ellipsis
  const getPageNumbers = () => {
    const range: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) range.push(i);
      return range;
    }
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);
    range.push(1);
    if (left > 2) range.push('ellipsis');
    for (let i = left; i <= right; i++) range.push(i);
    if (right < totalPages - 1) range.push('ellipsis');
    range.push(totalPages);
    return range;
  };

  return (
    <>
      <ProductsToolbar search={search} status={status} sort={sort} />
      <ProductsGrid products={products} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-6 pb-2">
          {/* Previous */}
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
            className="h-9 gap-1.5 px-3 text-sm font-medium disabled:opacity-40"
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} size={15} />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Page number pills */}
          <div className="flex items-center gap-1">
            {getPageNumbers().map((p, i) =>
              p === 'ellipsis' ? (
                <span
                  key={`ellipsis-${i}`}
                  className="w-9 text-center text-sm text-muted-foreground select-none"
                >
                  &hellip;
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`h-9 w-9 cursor-pointer rounded-md text-sm font-medium transition-colors
                    ${
                      p === page
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Next */}
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
            className="h-9 gap-1.5 px-3 text-sm font-medium disabled:opacity-40"
          >
            <span className="hidden sm:inline">Next</span>
            <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
          </Button>
        </div>
      )}
    </>
  );
}

export default ProductPageContent;
