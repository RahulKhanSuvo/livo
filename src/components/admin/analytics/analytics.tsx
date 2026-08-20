'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { Card, CardContent, CardHeader, CardTitle, CardAction } from '@/components/ui/card';
import { AreaChart, BarChart, DonutChart } from '@/components/admin/ui/charts';
import { StatCard } from '@/components/admin/ui/stat-card';
import { PageHeader } from '@/components/admin/ui/page-header';
import {
  BanknoteIcon,
  ChartColumnIcon,
  Invoice02Icon,
  PieChart01Icon,
  UserGroupIcon,
} from '@hugeicons/core-free-icons';
import {
  salesTrend,
  categoryPerformance,
  newVsReturning,
  revenueChannels,
  weeklyRevenue,
  acquisitionSeries,
} from './analytics.data';

function SectionTitle({
  icon,
  tone,
  children,
}: {
  icon: typeof BanknoteIcon;
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <h2 className="flex items-center gap-2.5 font-serif text-2xl font-semibold text-foreground">
      <span
        className="grid size-8 place-items-center rounded-sm"
        style={{ backgroundColor: `${tone ?? '#4b6b56'}1a`, color: tone ?? '#4b6b56' }}
      >
        <HugeiconsIcon icon={icon} size={16} />
      </span>
      {children}
    </h2>
  );
}

export function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="A deep-dive into how your store is performing across every dimension."
        actions={
          <div className="flex gap-2">
            <button className="rounded-full border border-foreground/10 bg-white px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              Last quarter
            </button>
            <button className="rounded-full bg-[#4b6b56] px-4 py-2 text-sm font-medium text-[#f4f1e8]">
              Export report
            </button>
          </div>
        }
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Net revenue" value="$128.4k" delta="+12.4%" icon={BanknoteIcon} />
        <StatCard
          label="Orders"
          value="1,284"
          delta="+8.1%"
          icon={Invoice02Icon}
          accent="#d98e63"
        />
        <StatCard label="AOV" value="$100" delta="+3.9%" icon={PieChart01Icon} />
        <StatCard
          label="Customers"
          value="3,042"
          delta="+5.6%"
          icon={UserGroupIcon}
          accent="#d98e63"
        />
      </div>

      <section id="sales" className="scroll-mt-20 space-y-5">
        <SectionTitle icon={BanknoteIcon}>Sales</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="bg-white lg:col-span-3">
            <CardHeader>
              <CardTitle>Sales volume (weekly)</CardTitle>
              <CardAction>
                <span className="rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  +12.4%
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <AreaChart data={salesTrend} />
            </CardContent>
          </Card>
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle>Sales by category</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={categoryPerformance.map((c) => ({ label: c.label, value: c.value }))}
                color="#4b6b56"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="products" className="scroll-mt-20 space-y-5">
        <SectionTitle icon={ChartColumnIcon} tone="#b46a3f">
          Products
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-3">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Category performance</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart segments={newVsReturning} centerValue="1,284" centerLabel="units" />
            </CardContent>
          </Card>
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle>Units sold by category</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={categoryPerformance.map((c) => ({ label: c.label, value: c.value }))}
                color="#d98e63"
              />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="customers" className="scroll-mt-20 space-y-5">
        <SectionTitle icon={UserGroupIcon}>Customers</SectionTitle>
        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="bg-white lg:col-span-3">
            <CardHeader>
              <CardTitle>New customers</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart data={acquisitionSeries} color="#8a9b80" />
            </CardContent>
          </Card>
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle>Cohort mix</CardTitle>
            </CardHeader>
            <CardContent>
              <DonutChart segments={newVsReturning} centerValue="3,042" centerLabel="customers" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="revenue" className="scroll-mt-20 space-y-5">
        <SectionTitle icon={PieChart01Icon} tone="#b46a3f">
          Revenue
        </SectionTitle>
        <div className="grid gap-5 lg:grid-cols-5">
          <Card className="bg-white lg:col-span-3">
            <CardHeader>
              <CardTitle>Revenue by channel</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={revenueChannels.map((c) => ({ label: c.label, value: c.value }))}
                color="#4b6b56"
              />
            </CardContent>
          </Card>
          <Card className="bg-white lg:col-span-2">
            <CardHeader>
              <CardTitle>This week</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart data={weeklyRevenue} color="#d98e63" />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
