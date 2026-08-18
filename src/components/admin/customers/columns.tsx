'use client';

import { DataTableColumn } from '@/components/shared/data-table';
import { Avatar } from '@/components/admin/ui/badges';
import { formatMoney, initials } from '@/components/admin/ui/format';
import type { CustomerRow } from '@/actions/customer/customer.validation';

export function customerColumns(): DataTableColumn<CustomerRow>[] {
  return [
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }) => {
        const r = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar initials={initials(r.name)} tone="#8a9b80" />
            <div>
              <p className="font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'orders',
      header: 'Orders',
      cell: ({ row }) => <span className="font-medium">{row.original.orders}</span>,
    },
    {
      accessorKey: 'spent',
      header: 'Total spent',
      cell: ({ row }) => <span className="font-medium">{formatMoney(row.original.spent)}</span>,
    },
    {
      accessorKey: 'joined',
      header: 'Joined',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.joined}</span>,
    },
    {
      accessorKey: 'lastOrder',
      header: 'Last order',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.lastOrder}</span>,
    },
  ];
}
