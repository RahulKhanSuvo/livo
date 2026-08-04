import { HugeiconsIcon } from '@hugeicons/react';
import {
  MoreHorizontalIcon,
  PlusSignIcon,
  RefreshIcon,
  StarCircleIcon,
  UserAdd01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { Avatar, StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney, initials } from '@/components/admin/ui/format';
import { StatCard } from '@/components/admin/ui/stat-card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { customers, type CustomerRow } from './customers.data';

const columns: Column<CustomerRow>[] = [
  {
    key: 'customer',
    header: 'Customer',
    cell: (r) => (
      <div className="flex items-center gap-3">
        <Avatar initials={initials(r.name)} tone="#8a9b80" />
        <div>
          <p className="font-medium">{r.name}</p>
          <p className="text-xs text-muted-foreground">{r.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'segment',
    header: 'Segment',
    cell: (r) => <StatusBadge status={r.segment} />,
  },
  { key: 'orders', header: 'Orders', cell: (r) => <span className="font-medium">{r.orders}</span> },
  { key: 'spent', header: 'Total spent', cell: (r) => <span className="font-medium">{formatMoney(r.spent)}</span> },
  { key: 'joined', header: 'Joined', cell: (r) => <span className="text-foreground/80">{r.joined}</span> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Customer actions">
              <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">View profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Order history</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              Block customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function CustomersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        description="Your community of homeowners, designers and repeat collectors."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Invite customer
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value="3,042" delta="+5.6%" icon={UserGroupIcon} />
        <StatCard label="VIP customers" value="214" delta="+3.2%" icon={StarCircleIcon} accent="#d98e63" />
        <StatCard label="New this month" value="96" delta="+8.4%" icon={UserAdd01Icon} />
        <StatCard label="Retention rate" value="64%" delta="-1.1%" trend="down" icon={RefreshIcon} accent="#d98e63" />
      </div>
      <DataTable columns={columns} data={customers} keyField={(r) => r.id} />
    </div>
  );
}