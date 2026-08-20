import { HugeiconsIcon } from '@hugeicons/react';
import { MoreHorizontalIcon, PlusSignIcon, RefreshIcon } from '@hugeicons/core-free-icons';

import { PageHeader } from '@/components/admin/ui/page-header';
import { DataTable, type Column } from '@/components/admin/ui/data-table';
import { StatusBadge } from '@/components/admin/ui/badges';
import { formatMoney } from '@/components/admin/ui/format';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  shippingZones,
  deliveryFees,
  tracking,
  type ShippingZone,
  type DeliveryFee,
  type TrackingRow,
} from './shipping.data';

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
          <DropdownMenuItem className="cursor-pointer">View details</DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="cursor-pointer">
            Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const zoneCols: Column<ShippingZone>[] = [
  { key: 'name', header: 'Zone', cell: (r) => <span className="font-medium">{r.name}</span> },
  {
    key: 'regions',
    header: 'Regions',
    cell: (r) => <span className="text-foreground/80">{r.regions}</span>,
  },
  {
    key: 'carriers',
    header: 'Carriers',
    cell: (r) => <span className="text-foreground/80">{r.carriers}</span>,
  },
  {
    key: 'delivery',
    header: 'Delivery',
    cell: (r) => <span className="text-primary font-medium">{r.delivery}</span>,
  },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const feeCols: Column<DeliveryFee>[] = [
  { key: 'zone', header: 'Zone', cell: (r) => <span className="font-medium">{r.zone}</span> },
  {
    key: 'method',
    header: 'Method',
    cell: (r) => <span className="text-foreground/80">{r.method}</span>,
  },
  {
    key: 'threshold',
    header: 'Weight',
    cell: (r) => <span className="text-foreground/80">{r.threshold}</span>,
  },
  {
    key: 'fee',
    header: 'Fee',
    cell: (r) => <span className="font-medium">{formatMoney(r.fee)}</span>,
  },
  {
    key: 'free',
    header: 'Free over',
    cell: (r) =>
      r.freeOver > 0 ? (
        <span className="text-emerald-700 text-xs">Free over {formatMoney(r.freeOver)}</span>
      ) : (
        <span className="text-muted-foreground">—</span>
      ),
  },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

const trackCols: Column<TrackingRow>[] = [
  { key: 'order', header: 'Order', cell: (r) => <span className="font-semibold">{r.order}</span> },
  {
    key: 'carrier',
    header: 'Carrier',
    cell: (r) => <span className="text-foreground/80">{r.carrier}</span>,
  },
  {
    key: 'trackingNo',
    header: 'Tracking no.',
    cell: (r) => <span className="font-mono text-xs">{r.trackingNo}</span>,
  },
  { key: 'eta', header: 'ETA', cell: (r) => <span className="text-foreground/80">{r.eta}</span> },
  { key: 'status', header: 'Status', cell: (r) => <StatusBadge status={r.status} /> },
  {
    key: 'actions',
    header: '',
    headerClassName: 'text-right',
    className: 'text-right',
    cell: () => <RowActions />,
  },
];

export function ZonesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipping Zones"
        description="Where you deliver and the carriers you use in each region."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add zone
          </Button>
        }
      />
      <DataTable columns={zoneCols} data={shippingZones} keyField={(r) => r.id} />
    </div>
  );
}

export function DeliveryFeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Delivery Fees"
        description="Rates and free-shipping thresholds per method and zone."
        actions={
          <Button className="gap-1.5">
            <HugeiconsIcon icon={PlusSignIcon} size={16} />
            Add fee
          </Button>
        }
      />
      <DataTable columns={feeCols} data={deliveryFees} keyField={(r) => r.id} />
    </div>
  );
}

export function TrackingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tracking"
        description="Realtime shipment progress for orders out for delivery."
        actions={
          <Button variant="secondary">
            <HugeiconsIcon icon={RefreshIcon} size={16} />
            Refresh
          </Button>
        }
      />
      <DataTable columns={trackCols} data={tracking} keyField={(r) => r.id} />
    </div>
  );
}
