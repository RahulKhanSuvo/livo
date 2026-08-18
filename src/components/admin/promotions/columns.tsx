'use client';

import { DataTableColumn } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  PencilIcon,
  Delete01Icon,
  PowerIcon,
} from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { CouponRow } from '@/actions/coupon/coupon.validation';

export function couponColumns(handlers: {
  onEdit: (c: CouponRow) => void;
  onDelete: (c: CouponRow) => void;
  onToggle: (c: CouponRow) => void;
}): DataTableColumn<CouponRow>[] {
  return [
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => <span className="font-semibold uppercase">{row.original.code}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {row.original.type === 'PERCENTAGE' ? 'Percentage' : 'Fixed amount'}
        </span>
      ),
    },
    {
      accessorKey: 'value',
      header: 'Value',
      cell: ({ row }) => (
        <span className="font-medium">
          {row.original.type === 'PERCENTAGE'
            ? `${row.original.value}%`
            : formatMoney(row.original.value)}
        </span>
      ),
    },
    {
      accessorKey: 'minOrder',
      header: 'Min order',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {row.original.minOrder != null ? formatMoney(row.original.minOrder) : '—'}
        </span>
      ),
    },
    {
      accessorKey: 'usedCount',
      header: 'Uses',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {row.original.usedCount}
          {row.original.maxUses != null ? ` / ${row.original.maxUses}` : ''}
        </span>
      ),
    },
    {
      accessorKey: 'expiresAt',
      header: 'Expires',
      cell: ({ row }) => (
        <span className="text-foreground/80">
          {row.original.expiresAt
            ? new Date(row.original.expiresAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Never'}
        </span>
      ),
    },
    {
      accessorKey: 'active',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.active ? 'ACTIVE' : 'DEACTIVATED'} />,
    },
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${c.code}`}>
                  <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer" onClick={() => handlers.onEdit(c)}>
                  <HugeiconsIcon icon={PencilIcon} size={15} strokeWidth={2} />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => handlers.onToggle(c)}>
                  <HugeiconsIcon icon={PowerIcon} size={15} strokeWidth={2} />
                  {c.active ? 'Deactivate' : 'Activate'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handlers.onDelete(c)}
                >
                  <HugeiconsIcon icon={Delete01Icon} size={15} strokeWidth={2} />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
}
