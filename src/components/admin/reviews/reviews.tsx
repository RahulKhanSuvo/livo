import { HugeiconsIcon } from '@hugeicons/react';
import {
  ChatIcon,
  CheckmarkCircle01Icon,
  Clock01Icon,
  MoreHorizontalIcon,
  StarIcon,
} from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { Avatar, StatusBadge, Stars } from '@/components/admin/ui/badges';
import { initials } from '@/components/admin/ui/format';
import { StatCard } from '@/components/admin/ui/stat-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { reviews, type Review } from './reviews.data';

const columns: Column<Review>[] = [
  {
    key: 'review',
    header: 'Review',
    cell: (r) => (
      <div className="max-w-md">
        <p className="font-medium">{r.title}</p>
        <p className="truncate text-muted-foreground">for {r.product}</p>
      </div>
    ),
  },
  {
    key: 'author',
    header: 'Author',
    cell: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar initials={initials(r.author)} tone="#8a9b80" />
        <span className="font-medium">{r.author}</span>
      </div>
    ),
  },
  { key: 'rating', header: 'Rating', cell: (r) => <Stars rating={r.rating} /> },
  { key: 'date', header: 'Date', cell: (r) => <span className="text-foreground/80">{r.date}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Review actions">
              <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Approve</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Reply</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              Hide review
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reviews"
        description="Customer feedback on their furniture — approve, moderate and reply."
        actions={
          <Button variant="secondary" className="gap-1.5">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={16} />
            Approve pending
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average rating" value="4.8" delta="+0.1" icon={StarIcon} />
        <StatCard label="Total reviews" value="1,042" delta="+11%" icon={ChatIcon} accent="#d98e63" />
        <StatCard label="Pending review" value="12" hint="awaiting moderation" icon={Clock01Icon} />
        <StatCard label="Recommend rate" value="94%" delta="+2%" icon={CheckmarkCircle01Icon} accent="#d98e63" />
      </div>
      <DataTable columns={columns} data={reviews} keyField={(r) => r.id} />
    </div>
  );
}
