import { HugeiconsIcon } from '@hugeicons/react';
import { BanknoteIcon, CheckmarkCircle01Icon, MoreHorizontalIcon, PlusSignIcon, RefreshIcon, Wallet01Icon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import { StatCard } from '@/components/admin/ui/stat-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { paymentMethods, transactions, type PaymentMethodRow, type TransactionRow } from './payments.data';

const methodCols: Column<PaymentMethodRow>[] = [
  { key: 'provider', header: 'Provider', cell: (r) => <span className="font-medium">{r.provider}</span> },
  { key: 'type', header: 'Type', cell: (r) => <span className="text-foreground/80">{r.type}</span> },
  { key: 'fee', header: 'Processing fee', cell: (r) => <span className="text-foreground/80">{r.fee}</span> },
  {
    key: 'enabled',
    header: 'Status',
    cell: (r) => <StatusBadge status={r.enabled ? 'Active' : 'Inactive'} />,
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Method actions">
              <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">Configure</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Test mode</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

const txCols: Column<TransactionRow>[] = [
  { key: 'order', header: 'Order', cell: (r) => <span className="font-semibold">{r.order}</span> },
  { key: 'customer', header: 'Customer', cell: (r) => <span className="text-foreground/80">{r.customer}</span> },
  { key: 'method', header: 'Method', cell: (r) => <span className="text-foreground/80">{r.method}</span> },
  {
    key: 'amount',
    header: 'Amount',
    cell: (r) => (
      <span className={r.amount < 0 ? 'font-medium text-destructive' : 'font-medium'}>
        {r.amount < 0 ? '- ' : ''}
        {formatMoney(Math.abs(r.amount))}
      </span>
    ),
  },
  { key: 'date', header: 'Date', cell: (r) => <span className="text-foreground/80">{r.date}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
];

export function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Accepted providers and a live view of every transaction."
        actions={
          <Button variant="secondary" className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add provider
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Processed this month" value="$118.4k" delta="+9.6%" icon={BanknoteIcon} />
        <StatCard label="Success rate" value="98.2%" delta="+0.3%" icon={CheckmarkCircle01Icon} accent="#d98e63" />
        <StatCard label="Pending payouts" value="$6.8k" hint="releases Aug 10" icon={Wallet01Icon} />
        <StatCard label="Refunds" value="1.4%" delta="-0.2%" icon={RefreshIcon} accent="#d98e63" />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
              Providers
            </p>
            <DataTable columns={methodCols} data={paymentMethods} keyField={(r) => r.id} />
          </div>
        </div>
        <div className="space-y-5">
          <p className="mb-3 text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Recent transactions
          </p>
          <DataTable columns={txCols} data={transactions} keyField={(r) => r.id} />
        </div>
      </div>
    </div>
  );
}
