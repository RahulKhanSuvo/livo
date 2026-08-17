'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';

import { DataTableColumn } from '@/components/shared/data-table';
import { StatusBadge, Avatar } from '@/components/admin/ui/badges';
import { formatMoney, initials } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderRow } from '@/actions/order/getAllOrdersAction';

export function orderColumns(onViewDetails: (id: string) => void): DataTableColumn<OrderRow>[] {
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
      accessorKey: 'items',
      header: 'Items',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.items}</span>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div>
            <p className="font-medium">{formatMoney(r.total)}</p>
            <p className="text-xs text-muted-foreground">{r.paymentStatus}</p>
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
                <DropdownMenuItem className="cursor-pointer" onClick={() => onViewDetails(r.id)}>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Update status</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Print invoice</DropdownMenuItem>
                <DropdownMenuItem variant="destructive" className="cursor-pointer">
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
