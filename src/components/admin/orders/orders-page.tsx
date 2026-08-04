'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon } from '@hugeicons/core-free-icons';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge, Avatar } from '@/components/admin/ui/badges';
import { formatMoney, initials } from '@/components/admin/ui/format';
import { PageHeader } from '@/components/admin/ui/page-header';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { orders, orderSteps, countOrdersByStatus, type OrderRow } from './orders.data';

const tabs = [
  { id: 'ALL', label: 'All' },
  ...orderSteps.map((s) => ({ id: s.id, label: s.label })),
  { id: 'CANCELLED', label: 'Cancelled' },
];

const columns: Column<OrderRow>[] = [
  {
    key: 'order',
    header: 'Order',
    cell: (r) => (
      <div>
        <p className="font-semibold">{r.orderNumber}</p>
        <p className="text-xs text-muted-foreground">{r.date}</p>
      </div>
    ),
  },
  {
    key: 'customer',
    header: 'Customer',
    cell: (r) => (
      <div className="flex items-center gap-2.5">
        <Avatar initials={initials(r.customer)} tone="#8a9b80" />
        <div>
          <p className="font-medium">{r.customer}</p>
          <p className="text-xs text-muted-foreground">{r.email}</p>
        </div>
      </div>
    ),
  },
  { key: 'items', header: 'Items', cell: (r) => <span className="text-foreground/80">{r.items}</span> },
  {
    key: 'total',
    header: 'Total',
    cell: (r) => (
      <div>
        <p className="font-medium">{formatMoney(r.total)}</p>
        <p className="text-xs text-muted-foreground">{r.paymentStatus}</p>
      </div>
    ),
  },
  {
    key: 'status',
    header: 'Status',
    cell: (r) => <StatusBadge status={r.status} />,
  },
  {
    key: 'actions',
    header: '',
    className: 'text-right',
    headerClassName: 'text-right',
    cell: (r) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${r.orderNumber}`}>
              <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="cursor-pointer">View details</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Update status</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Print invoice</DropdownMenuItem>
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              Cancel order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function OrdersPage({ status }: { status: string }) {
  const active = status || 'ALL';
  const counts = countOrdersByStatus(orders);
  const filtered = active === 'ALL' ? orders : orders.filter((o) => o.status === active);
  const activeLabel =
    active === 'ALL' ? 'All orders' : active.charAt(0) + active.slice(1).toLowerCase();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Track, manage and fulfil every order across your storefront."
        actions={
          <div className="flex gap-2">
            <Button variant="secondary">Export</Button>
            <Button>New order</Button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-white p-1.5 ring-1 ring-foreground/10">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          return (
            <Link
              key={tab.id}
              href={`/admin/orders${tab.id === 'ALL' ? '' : `?status=${tab.id}`}`}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar text-[#f4f1e8]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {tab.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  isActive ? 'bg-white/15' : 'bg-muted text-muted-foreground'
                }`}
              >
                {counts[tab.id] ?? 0}
              </span>
            </Link>
          );
        })}
      </div>

      <DataTable columns={columns} data={filtered} keyField={(r) => r.id} />

      <div className="grid gap-5 sm:grid-cols-3">
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Order value
              <span className="text-xs text-muted-foreground">avg</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-heading text-2xl font-semibold">
              {formatMoney(
                Math.round(filtered.reduce((a, o) => a + o.total, 0) / (filtered.length || 1))
              )}
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Fulfilment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{activeLabel} view</p>
          </CardContent>
        </Card>
        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {filtered.filter((o) => o.paymentStatus === 'PAID').length} of {filtered.length} paid
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}