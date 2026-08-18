'use client';

import Link from 'next/link';
import {
  BanknoteIcon,
  ChartUpIcon,
  Invoice02Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';

import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { StatCard } from '@/components/admin/ui/stat-card';
import { AreaChart, BarChart, DonutChart } from '@/components/admin/ui/charts';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  dashboardMetrics,
  salesSeries,
  categoryShare,
  topProducts,
  recentOrders,
  lowStock,
  trafficSource,
} from './dashboard.data';
const productCols: Column<(typeof topProducts)[number]>[] = [
  {
    key: 'name',
    header: 'Product',
    cell: (r) => (
      <div>
        <p className="font-medium">{r.name}</p>
        <p className="text-xs text-muted-foreground">{r.brand}</p>
      </div>
    ),
  },
  { key: 'sold', header: 'Sold', cell: (r) => <span className="font-medium">{r.sold}</span> },
  {
    key: 'revenue',
    header: 'Revenue',
    cell: (r) => <span className="font-medium">{formatMoney(r.revenue)}</span>,
  },
  {
    key: 'delta',
    header: 'Δ',
    cell: (r) => <span className="text-emerald-700">{r.delta}</span>,
  },
];

const orderColumns: Column<(typeof recentOrders)[number]>[] = [
  {
    key: 'order',
    header: 'Order',
    cell: (r) => <span className="font-semibold">{r.orderNumber}</span>,
  },
  { key: 'customer', header: 'Customer', cell: (r) => r.customer },
  { key: 'total', header: 'Total', cell: (r) => formatMoney(r.total) },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
];

const icons = [BanknoteIcon, Invoice02Icon, UserGroupIcon, ChartUpIcon] as const;

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Welcome back, Rahul. Here is what’s happening across your store today.
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button asChild className="gap-1.5">
            <Link href="/admin/catalog/products">Manage catalog</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((m, i) => (
          <StatCard
            key={m.id}
            label={m.label}
            value={m.value}
            delta={m.delta}
            trend={m.trend}
            hint={m.hint}
            icon={icons[i]}
            accent={i === 1 ? '#d98e63' : '#4b6b56'}
          />
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
            <CardAction>
              <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                +12.4%
              </span>
            </CardAction>
          </CardHeader>
          <CardContent>
            <AreaChart data={salesSeries.map((d) => ({ label: d.label, value: d.value }))} />
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Sales by category</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart segments={categoryShare} centerValue="$128K" centerLabel="Total" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle>Top products</CardTitle>
            <CardAction>
              <Link
                href="/admin/analytics#products"
                className="text-sm font-medium text-[#b56a3f] hover:underline"
              >
                View analytics
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <DataTable columns={productCols} data={topProducts} keyField={(r) => r.id} />
          </CardContent>
        </Card>

        <Card className="bg-white/90">
          <CardHeader>
            <CardTitle>Low stock</CardTitle>
            <CardAction>
              <Link
                href="/admin/catalog/inventory"
                className="text-sm font-medium text-[#b46a3f] hover:underline"
              >
                Inventory
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-3">
            {lowStock.map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                    p.stock === 0
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-amber-600/10 text-amber-700'
                  }`}
                >
                  {p.stock} left
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">
        <Card className="bg-white/90 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent orders</CardTitle>
            <CardAction>
              <Link
                href="/admin/orders"
                className="text-sm font-medium text-[#b46a3f] hover:underline"
              >
                View all
              </Link>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <DataTable columns={orderColumns} data={recentOrders} keyField={(r) => r.id} />
          </CardContent>
        </Card>

        <Card className="bg-white/90 lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <BarChart
              data={trafficSource.map((t) => ({ label: t.label, value: t.value }))}
              color="#4b6b56"
            />
            <div className="space-y-2">
              {trafficSource.map((t) => (
                <div key={t.label} className="flex items-center gap-2 text-sm">
                  <span className="size-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                  <span className="text-foreground/80">{t.label}</span>
                  <span className="ml-auto font-semibold">{t.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
