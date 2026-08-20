'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';

interface EmptyProductsProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetLabel?: string;
}

export function EmptyProducts({
  title = 'No products found',
  description = 'Try adjusting your search or filter to find what you’re looking for.',
  onReset,
  resetLabel = 'Clear filters',
}: EmptyProductsProps) {
  return (
    <div className="flex min-h-75 flex-col items-center justify-center rounded-sm border border-dashed border-neutral-200 bg-neutral-50/50 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HugeiconsIcon icon={PackageOpenIcon} size={28} strokeWidth={1.6} />
      </div>

      <h3 className="mt-5 text-lg font-medium tracking-tight text-neutral-900">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm font-light leading-relaxed text-neutral-500">
        {description}
      </p>

      {onReset && (
        <Button variant="outline" size="sm" className="mt-6" onClick={onReset}>
          {resetLabel}
        </Button>
      )}
    </div>
  );
}
