import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon, PlusSignIcon } from '@hugeicons/core-free-icons';

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
import {
  coupons,
  discounts,
  giftCards,
  type Coupon,
  type Discount,
  type GiftCard,
} from './promotions.data';

import {
  BadgePercentIcon,
  BanknoteIcon,
  CheckmarkCircle01Icon,
  Coupon01Icon,
  GiftCardIcon,
  Wallet01Icon,
} from '@hugeicons/core-free-icons';

function RowActions() {
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Row actions">
            <HugeiconsIcon icon={MoreHorizontalIcon} size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Share code</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const couponCols: Column<Coupon>[] = [
  {
    key: 'code',
    header: 'Code',
    cell: (r) => (
      <div>
        <p className="font-mono text-[13px] font-semibold">{r.code}</p>
        <p className="text-xs text-muted-foreground">{r.description}</p>
      </div>
    ),
  },
  { key: 'type', header: 'Type', cell: (r) => <span className="text-foreground/80">{r.type}</span> },
  { key: 'value', header: 'Value', cell: (r) => <span className="font-medium">{r.value}</span> },
  { key: 'usage', header: 'Usage', cell: (r) => <span className="font-medium">{r.used} / {r.usage}</span> },
  { key: 'expires', header: 'Expires', cell: (r) => <span className="text-foreground/80">{r.expires}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', header: '', headerClassName: 'text-right', className: 'text-right', cell: () => <RowActions /> },
];

const discountCols: Column<Discount>[] = [
  { key: 'name', header: 'Discount', cell: (r) => <span className="font-medium">{r.name}</span> },
  { key: 'kind', header: 'Kind', cell: (r) => <span className="text-foreground/80">{r.kind}</span> },
  { key: 'value', header: 'Value', cell: (r) => <span className="font-semibold text-[#b46a3f]">{r.value}</span> },
  { key: 'products', header: 'Scope', cell: (r) => <span className="text-foreground/80">{r.products}</span> },
  { key: 'ends', header: 'Ends', cell: (r) => <span className="text-foreground/80">{r.ends}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', header: '', headerClassName: 'text-right', className: 'text-right', cell: () => <RowActions /> },
];

const giftCardCols: Column<GiftCard>[] = [
  { key: 'code', header: 'Code', cell: (r) => <span className="font-mono text-[13px] font-semibold">{r.code}</span> },
  { key: 'recipient', header: 'Recipient', cell: (r) => <span className="text-foreground/80">{r.recipient}</span> },
  { key: 'initial', header: 'Initial', cell: (r) => <span className="font-medium">{formatMoney(r.initial)}</span> },
  { key: 'balance', header: 'Balance', cell: (r) => <span className="font-medium">{formatMoney(r.balance)}</span> },
  { key: 'issueDate', header: 'Issued', cell: (r) => <span className="text-foreground/80">{r.issueDate}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  { key: 'actions', header: '', headerClassName: 'text-right', className: 'text-right', cell: () => <RowActions /> },
];

export function CouponsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Coupons"
        description="Promo codes your customers redeem at checkout."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            New coupon
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Active coupons" value="3" delta="+1" icon={Coupon01Icon} />
        <StatCard label="Redemptions" value="1,319" delta="+18%" icon={BadgePercentIcon} accent="#d98e63" />
        <StatCard label="Revenue attributed" value="$24.6k" delta="+9.2%" icon={BanknoteIcon} accent="#d98e63" />
      </div>
      <DataTable columns={couponCols} data={coupons} keyField={(r) => r.id} />
    </div>
  );
}

export function DiscountsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Discounts"
        description="Bundles, flash sales and loyalty offers running across the store."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            New discount
          </Button>
        }
      />
      <DataTable columns={discountCols} data={discounts} keyField={(r) => r.id} />
    </div>
  );
}

export function GiftCardsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gift Cards"
        description="Gift cards issued to customers and their remaining balances."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Issue gift card
          </Button>
        }
      />
      <div className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Cards active" value="18" delta="+4" icon={GiftCardIcon} />
        <StatCard label="Outstanding value" value="$4,280" delta="+6.4%" icon={Wallet01Icon} accent="#d98e63" />
        <StatCard label="Redeemed" value="42%" delta="+2.1%" icon={CheckmarkCircle01Icon} accent="#d98e63" />
      </div>
      <DataTable columns={giftCardCols} data={giftCards} keyField={(r) => r.id} />
    </div>
  );
}
