'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ProductPaginationProps {
  total: number;
  limit: number;
  page: number;
}

function getPageItems(current: number, totalPages: number): (number | '...')[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | '...')[] = [1];
  if (current > 3) pages.push('...');

  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < totalPages - 2) pages.push('...');
  pages.push(totalPages);

  return pages;
}

export const ProductPagination = ({ total, limit, page }: ProductPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.max(1, Math.ceil(total / limit));
  if (totalPages <= 1) return null;

  const goToPage = (next: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(next));
    router.push(`${pathname}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageItems = getPageItems(page, totalPages);

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={page <= 1}
        className="flex h-9 items-center rounded-none border border-neutral-300 px-3 text-xs text-neutral-700 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
      >
        Prev
      </button>

      {pageItems.map((item, i) =>
        item === '...' ? (
          <span key={`gap-${i}`} className="px-2 text-sm text-neutral-400">
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => goToPage(item)}
            className={`h-9 w-9 rounded-none border text-xs transition-colors ${
              item === page
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-neutral-300 text-neutral-700 hover:border-primary'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={page >= totalPages}
        className="flex h-9 items-center rounded-none border border-neutral-300 px-3 text-xs text-neutral-700 transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-30"
      >
        Next
      </button>
    </div>
  );
};

export default ProductPagination;
