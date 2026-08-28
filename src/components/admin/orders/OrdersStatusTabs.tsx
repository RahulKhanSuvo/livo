'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingBag01Icon,
  Settings02Icon,
  DeliveryTruck01Icon,
  Cancel01Icon,
} from '@hugeicons/core-free-icons';
import type { OrderStatus } from '@/generated/prisma/client';
import { cn } from '@/lib/utils';

export type StatusTabKey = 'ALL' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

export interface StatusCounts {
  all?: number;
  processing?: number;
  shipped?: number;
  canceled?: number;
}

interface OrdersStatusTabsProps {
  activeStatus?: OrderStatus | 'ALL';
  counts?: StatusCounts;
  onStatusChange: (status: StatusTabKey) => void;
}

function formatCount(count?: number): string {
  if (count === undefined || count === null) return '0';
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export function OrdersStatusTabs({
  activeStatus = 'ALL',
  counts = {},
  onStatusChange,
}: OrdersStatusTabsProps) {
  const tabs: {
    key: StatusTabKey;
    label: string;
    icon: typeof ShoppingBag01Icon;
    count: number | undefined;
  }[] = [
    {
      key: 'ALL',
      label: 'All order',
      icon: ShoppingBag01Icon,
      count: counts.all,
    },
    {
      key: 'PROCESSING',
      label: 'Processing',
      icon: Settings02Icon,
      count: counts.processing,
    },
    {
      key: 'SHIPPED',
      label: 'Shipped',
      icon: DeliveryTruck01Icon,
      count: counts.shipped,
    },
    {
      key: 'CANCELLED',
      label: 'Canceled',
      icon: Cancel01Icon,
      count: counts.canceled,
    },
  ];

  return (
    <div className="border-b border-border/80 w-full overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-6 min-w-max">
        {tabs.map((tab) => {
          const isActive =
            activeStatus === tab.key || (activeStatus === undefined && tab.key === 'ALL');

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onStatusChange(tab.key)}
              className={cn(
                'flex items-center gap-2 pb-3 pt-1 text-sm font-medium transition-colors relative border-b-2 -mb-px',
                isActive
                  ? 'border-blue-600 text-foreground font-semibold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              <HugeiconsIcon
                icon={tab.icon}
                size={16}
                className={cn(isActive ? 'text-foreground' : 'text-muted-foreground')}
              />
              <span>{tab.label}</span>
              <span
                className={cn(
                  'text-xs font-normal',
                  isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                )}
              >
                ({formatCount(tab.count)})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
