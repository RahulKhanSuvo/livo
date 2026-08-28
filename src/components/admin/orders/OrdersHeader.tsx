'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download01Icon, Loading01Icon } from '@hugeicons/core-free-icons';
import { exportOrdersAction } from '@/actions/order/exportOrdersAction';

interface OrdersHeaderProps {
  title?: string;
  subtitle?: string;
}

export function OrdersHeader({
  title = 'All Order',
  subtitle = "Check all orders at single place. It's easy to manage.",
}: OrdersHeaderProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const { filename, csvContent } = await exportOrdersAction();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to export orders:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>

      <Button
        type="button"
        onClick={handleExport}
        disabled={isExporting}
        className="text-white font-medium shadow-sm gap-2 h-10 px-4 rounded-lg w-full sm:w-auto justify-center self-start sm:self-auto"
      >
        {isExporting ? (
          <HugeiconsIcon icon={Loading01Icon} size={18} className="animate-spin" />
        ) : (
          <HugeiconsIcon icon={Download01Icon} size={18} />
        )}
        <span>Export Order List</span>
      </Button>
    </div>
  );
}
