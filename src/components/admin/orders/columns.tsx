'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';

import { DataTableColumn } from '@/components/shared/data-table';
import { StatusBadge, Avatar } from '@/components/admin/ui/badges';
import { cn } from '@/lib/utils';

const paymentDot: Record<string, string> = {
  PAID: 'bg-emerald-600',
  PENDING: 'bg-amber-500',
  FAILED: 'bg-destructive',
  REFUNDED: 'bg-violet-600',
};
import { formatMoney, initials } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderRow } from '@/actions/order/getAllOrdersAction';
import type { OrderStatus } from '@/generated/prisma/client';

export function orderColumns(handlers: {
  onViewDetails: (id: string) => void;
  onUpdateStatus: (id: string, currentStatus: OrderStatus) => void;
  onCancel: (id: string) => void;
}): DataTableColumn<OrderRow>[] {
  return [
    {
      accessorKey: 'orderNumber',
      header: 'Order',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div>
            <p className="font-semibold">{r.orderNumber}</p>
            <p className="text-xs text-muted-foreground">{r.date}</p>
          </div>
        );
      },
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <Avatar initials={initials(r.customer)} tone="#8a9b80" />
            <div>
              <p className="font-medium">{r.customer}</p>
              <p className="text-xs text-muted-foreground">{r.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      id: 'items',
      header: 'Items',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <span className="text-foreground/80">
            {r.firstItem}
            {r.itemCount > 1 ? ` +${r.itemCount - 1} more` : ''}
          </span>
        );
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div>
            <p className="font-medium">{formatMoney(r.total)}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                className={cn(
                  'size-1.5 rounded-full',
                  paymentDot[r.paymentStatus] ?? 'bg-muted-foreground'
                )}
              />
              <span className="capitalize">{r.paymentStatus.toLowerCase()}</span>
              <span className="text-muted-foreground/60">payment</span>
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.orderNumber}`}>
                  <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handlers.onViewDetails(r.id)}
                >
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => handlers.onUpdateStatus(r.id, r.status)}
                >
                  Update status
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Print invoice</DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handlers.onCancel(r.id)}
                >
                  Cancel order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
