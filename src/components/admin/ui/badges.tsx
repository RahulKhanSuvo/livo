import { HugeiconsIcon } from '@hugeicons/react';
import { StarIcon } from '@hugeicons/core-free-icons';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, string> = {
  Active: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Published: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Delivered: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Completed: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Paid: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Success: 'bg-emerald-600/10 text-emerald-700 dark:text-emerald-400',
  Draft: 'bg-amber-600/10 text-amber-700 dark:text-amber-400',
  Pending: 'bg-amber-600/10 text-amber-700 dark:text-amber-400',
  Processing: 'bg-sky-600/10 text-sky-700 dark:text-sky-400',
  Shipped: 'bg-sky-600/10 text-sky-700 dark:text-sky-400',
  'In transit': 'bg-sky-600/10 text-sky-700 dark:text-sky-400',
  Refunded: 'bg-violet-600/10 text-violet-700 dark:text-violet-400',
  Low: 'bg-amber-600/10 text-amber-700 dark:text-amber-400',
  Failed: 'bg-destructive/10 text-destructive',
  Returned: 'bg-destructive/10 text-destructive',
  Canceled: 'bg-muted text-muted-foreground',
  'Out of stock': 'bg-destructive/10 text-destructive',
  Inactive: 'bg-muted text-muted-foreground',
  Unpublished: 'bg-muted text-muted-foreground',
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'rounded-full border-transparent font-medium',
        statusStyles[status] ?? 'bg-muted text-muted-foreground'
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </Badge>
  );
}

export function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <HugeiconsIcon
          key={i}
          icon={StarIcon}
          size={size}
          className={i < Math.round(rating) ? 'text-[#d98e63]' : 'text-foreground/15'}
        />
      ))}
    </span>
  );
}

export function Avatar({
  initials,
  className,
  tone = '#4b6b56',
}: {
  initials: string;
  className?: string;
  tone?: string;
}) {
  return (
    <span
      className={cn(
        'grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-bold text-[#f4f1e8]',
        className
      )}
      style={{ backgroundColor: tone }}
    >
      {initials}
    </span>
  );
}