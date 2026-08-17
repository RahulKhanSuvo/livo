'use client';

import { Button } from '@/components/ui/button';

const DOTS = 'dots' as const;

const getPaginationRange = (currentPage: number, totalPages: number, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + 2 * siblingCount;
    return [...Array.from({ length: leftCount }, (_, i) => i + 1), DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + 2 * siblingCount;
    return [
      1,
      DOTS,
      ...Array.from({ length: rightCount }, (_, i) => totalPages - rightCount + 1 + i),
    ];
  }

  return [
    1,
    DOTS,
    ...Array.from({ length: rightSibling - leftSibling + 1 }, (_, i) => leftSibling + i),
    DOTS,
    totalPages,
  ];
};

interface PaginationFooterProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPageChange: (pageIndex: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function PaginationFooter({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  onPageChange,
  onPreviousPage,
  onNextPage,
}: PaginationFooterProps) {
  const currentPage = pageIndex + 1;

  return (
    <div className="flex flex-col gap-3 border-t border-foreground/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {pageCount || 1}
      </p>
      <div className="flex flex-wrap items-center gap-1">
        <Button variant="outline" size="sm" onClick={onPreviousPage} disabled={!canPreviousPage}>
          Prev
        </Button>

        {getPaginationRange(currentPage, pageCount || 1).map((item, i) =>
          typeof item === 'number' ? (
            <Button
              key={item}
              variant={item === currentPage ? 'default' : 'outline'}
              size="sm"
              className="min-w-8"
              onClick={() => onPageChange(item - 1)}
            >
              {item}
            </Button>
          ) : (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-muted-foreground">
              …
            </span>
          )
        )}

        <Button variant="outline" size="sm" onClick={onNextPage} disabled={!canNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
}
