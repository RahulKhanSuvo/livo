'use client';

import { DataTableColumn } from '@/components/shared/data-table';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import type { TransactionRow } from '@/actions/payments/payments.validation';

export function transactionColumns(): DataTableColumn<TransactionRow>[] {
  return [
    {
      accessorKey: 'order',
      header: 'Order',
      cell: ({ row }) => <span className="font-semibold">{row.original.order}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.customer}</span>,
    },
    {
      accessorKey: 'method',
      header: 'Method',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.method}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = row.original.amount;
        return (
          <span className={amount < 0 ? 'font-medium text-destructive' : 'font-medium'}>
            {amount < 0 ? '- ' : ''}
            {formatMoney(Math.abs(amount))}
          </span>
        );
      },
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-foreground/80">{row.original.date}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];
}
