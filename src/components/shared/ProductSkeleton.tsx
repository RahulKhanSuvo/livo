import { cn } from '@/lib/utils';

export function ProductSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Image */}
      <div className="aspect-square w-full bg-neutral-200 animate-pulse rounded-sm" />

      {/* Text */}
      <div className="flex flex-col space-y-2 pt-4">
        <div className="h-2.5 w-16 bg-neutral-200 animate-pulse rounded-sm" />
        <div className="h-4 w-3/4 bg-neutral-200 animate-pulse rounded-sm" />
        <div className="h-3.5 w-20 bg-neutral-200 animate-pulse rounded-sm" />
        <div className="flex items-center gap-1.5 pt-2">
          <div className="h-4 w-4 rounded-full bg-neutral-200 animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-neutral-200 animate-pulse" />
          <div className="h-4 w-4 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 10 }: { count?: number }) {
  return (
    <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
