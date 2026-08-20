import { Skeleton } from '@/components/ui/skeleton';

function PageHeaderSkeleton({ withAction = false }: { withAction?: boolean }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6">
        <Skeleton className="h-9 w-44" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      {withAction && <Skeleton className="h-9 w-28" />}
    </div>
  );
}

export function StatCardsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-24 w-full overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6"
        />
      ))}
    </div>
  );
}

function TableSkeleton({ cols = 6, rows = 10 }: { cols?: number; rows?: number }) {
  return (
    <div className="overflow-hidden rounded-sm bg-card shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6">
      <div className="border-b border-border/70 bg-[#f7f6f1] px-5 py-3.5">
        <div className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-3 w-20" />
          ))}
        </div>
      </div>
      <div className="divide-y divide-border/60">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 px-5 py-4">
            {Array.from({ length: cols }).map((_, c) => (
              <Skeleton key={c} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSkeleton withAction />
      <StatCardsSkeleton />

      {/* Filter bar */}
      <div className="flex flex-col gap-3 rounded-sm bg-card p-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-9 w-full lg:w-72" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col border border-neutral-200 bg-white">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="space-y-2 p-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OrdersSkeleton() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <StatCardsSkeleton />

      {/* Control bar: tabs + search + export */}
      <div className="flex flex-col gap-4 rounded-sm bg-card p-3 shadow-[0_1px_2px_rgba(28,39,32,0.05)] ring-1 ring-foreground/6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <TableSkeleton cols={6} rows={10} />
    </div>
  );
}

export function CustomersSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeaderSkeleton />
      <StatCardsSkeleton />
      <Skeleton className="h-9 w-full max-w-sm rounded-full" />
      <TableSkeleton cols={6} rows={10} />
    </div>
  );
}
