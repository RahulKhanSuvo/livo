// src/app/(admin)/admin/catalog/inventory/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  AlertCircleIcon,
  ArchiveIcon,
  CheckmarkCircle02Icon,
  Download02Icon,
  MinusPlus01Icon,
  PackageIcon,
  PlusMinus01Icon,
  RefreshIcon,
  Search01Icon,
} from '@hugeicons/core-free-icons';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock high-performance inventory dataset
const MOCK_INVENTORY = [
  {
    id: 'inv_1',
    sku: 'LIVO-CHR-001-BLK',
    productName: 'Ergonomic Executive Mesh Chair',
    variantColorName: 'Matte Black',
    colorHex: '#18181b',
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1203?w=150',
    category: 'Seating',
    location: 'Warehouse A (Bay 14)',
    availableStock: 142,
    reservedStock: 18,
    reorderPoint: 25,
    unitCost: 185.0,
    status: 'IN_STOCK',
    updatedAt: '2 mins ago',
  },
  {
    id: 'inv_2',
    sku: 'LIVO-DESK-002-OAK',
    productName: 'Nordic Oak Standing Desk',
    variantColorName: 'Natural Oak',
    colorHex: '#d4a373',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=150',
    category: 'Desks',
    location: 'Warehouse A (Bay 02)',
    availableStock: 4,
    reservedStock: 12,
    reorderPoint: 15,
    unitCost: 420.0,
    status: 'LOW_STOCK',
    updatedAt: '12 mins ago',
  },
  {
    id: 'inv_3',
    sku: 'LIVO-LAMP-009-SLV',
    productName: 'Minimalist LED Arch Lamp',
    variantColorName: 'Brushed Silver',
    colorHex: '#e4e4e7',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150',
    category: 'Lighting',
    location: 'Warehouse B (Bay 08)',
    availableStock: 0,
    reservedStock: 0,
    reorderPoint: 10,
    unitCost: 64.5,
    status: 'OUT_OF_STOCK',
    updatedAt: '1 hour ago',
  },
  {
    id: 'inv_4',
    sku: 'LIVO-CAB-004-WHT',
    productName: 'Modular 3-Drawer Credenza',
    variantColorName: 'Studio White',
    colorHex: '#ffffff',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=150',
    category: 'Storage',
    location: 'Warehouse A (Bay 21)',
    availableStock: 310,
    reservedStock: 5,
    reorderPoint: 40,
    unitCost: 290.0,
    status: 'OVERSTOCKED',
    updatedAt: 'Just now',
  },
];

export default function InventoryPage() {
  const [items, setItems] = useState(MOCK_INVENTORY);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'ALL' | 'LOW' | 'OUT'>('ALL');

  // Fast inline stock modifier function
  const handleStockAdjust = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newStock = Math.max(0, item.availableStock + delta);
        let newStatus = item.status;

        if (newStock === 0) newStatus = 'OUT_OF_STOCK';
        else if (newStock <= item.reorderPoint) newStatus = 'LOW_STOCK';
        else newStatus = 'IN_STOCK';

        return {
          ...item,
          availableStock: newStock,
          status: newStatus,
          updatedAt: 'Just now',
        };
      })
    );
  };

  // Quick Metrics
  const totalUnits = items.reduce((acc, i) => acc + i.availableStock, 0);
  const totalValue = items.reduce((acc, i) => acc + i.availableStock * i.unitCost, 0);
  const lowStockCount = items.filter(
    (i) => i.availableStock <= i.reorderPoint && i.availableStock > 0
  ).length;
  const outOfStockCount = items.filter((i) => i.availableStock === 0).length;

  // Filtered List
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase());

    if (activeTab === 'LOW')
      return matchesSearch && item.availableStock <= item.reorderPoint && item.availableStock > 0;
    if (activeTab === 'OUT') return matchesSearch && item.availableStock === 0;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950/5 p-6 space-y-8 dark:bg-zinc-950">
      {/* 1. TOP HEADER & METRICS CENTER */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Inventory Command Center
            </h1>
            <Badge
              variant="outline"
              className="text-xs font-mono bg-primary/10 text-primary border-primary/20"
            >
              LIVE SYNC
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time stock tracking, warehouse allocation, and automated reorder alerts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 shadow-xs">
            <HugeiconsIcon icon={Download02Icon} className="h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm" className="gap-2 bg-foreground text-background hover:bg-foreground/90">
            <HugeiconsIcon icon={RefreshIcon} className="h-4 w-4" />
            Stock Audit
          </Button>
        </div>
      </div>

      {/* 2. HIGH-IMPACT KPI CARDS */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Total On-Hand
              </p>
              <p className="text-2xl font-bold tracking-tight">
                {totalUnits.toLocaleString()} units
              </p>
            </div>
            <div className="h-10 w-10 rounded-sm bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <HugeiconsIcon icon={PackageIcon} className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Inventory Valuation
              </p>
              <p className="text-2xl font-bold tracking-tight">
                ${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="h-10 w-10 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <HugeiconsIcon icon={ArchiveIcon} className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Low Stock Warnings
              </p>
              <p className="text-2xl font-bold tracking-tight text-amber-500">
                {lowStockCount} SKUs
              </p>
            </div>
            <div className="h-10 w-10 rounded-sm bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Out of Stock
              </p>
              <p className="text-2xl font-bold tracking-tight text-rose-500">
                {outOfStockCount} SKUs
              </p>
            </div>
            <div className="h-10 w-10 rounded-sm bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <HugeiconsIcon icon={AlertCircleIcon} className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. TOOLBAR FILTERS & CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card/40 p-3 rounded-sm border border-border/60">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Filter Pills */}
          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              activeTab === 'ALL'
                ? 'bg-foreground text-background shadow-xs'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            All Stock ({items.length})
          </button>
          <button
            onClick={() => setActiveTab('LOW')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              activeTab === 'LOW'
                ? 'bg-amber-500/20 text-amber-600 font-semibold'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setActiveTab('OUT')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-all ${
              activeTab === 'OUT'
                ? 'bg-rose-500/20 text-rose-600 font-semibold'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>

        {/* Search & Location Select */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Search SKU or Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-xs bg-background/80"
            />
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="h-9 text-xs w-[160px] bg-background/80">
              <SelectValue placeholder="Warehouse" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Warehouses</SelectItem>
              <SelectItem value="wh-a">Warehouse A</SelectItem>
              <SelectItem value="wh-b">Warehouse B</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 4. PREMIUM INVENTORY DATA TABLE */}
      <div className="rounded-sm border border-border/60 bg-card overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-xs font-semibold uppercase text-muted-foreground border-b border-border/60">
              <tr>
                <th className="px-6 py-4">Item & SKU</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 min-w-[180px]">Stock Health</th>
                <th className="px-6 py-4 text-center">Quick Adjust</th>
                <th className="px-6 py-4 text-right">Unit Cost</th>
                <th className="px-6 py-4 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredItems.map((item) => {
                const stockRatio = Math.min(
                  100,
                  Math.round((item.availableStock / (item.reorderPoint * 3)) * 100)
                );

                return (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                    {/* Item Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm border bg-muted">
                          {item.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground truncate max-w-[220px]">
                            {item.productName}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[11px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded-sm">
                              {item.sku}
                            </span>
                            {item.variantColorName && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: item.colorHex }}
                                />
                                {item.variantColorName}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-xs font-medium text-muted-foreground">
                      {item.location}
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      {item.status === 'IN_STOCK' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-3.5 w-3.5" />
                          In Stock
                        </span>
                      )}
                      {item.status === 'LOW_STOCK' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                          <HugeiconsIcon icon={AlertCircleIcon} className="h-3.5 w-3.5" />
                          Low Stock
                        </span>
                      )}
                      {item.status === 'OUT_OF_STOCK' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-600 border border-rose-500/20">
                          <HugeiconsIcon icon={AlertCircleIcon} className="h-3.5 w-3.5" />
                          Out of Stock
                        </span>
                      )}
                      {item.status === 'OVERSTOCKED' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 border border-blue-500/20">
                          <HugeiconsIcon icon={PackageIcon} className="h-3.5 w-3.5" />
                          Overstocked
                        </span>
                      )}
                    </td>

                    {/* Stock Level Bar & Threshold */}
                    <td className="px-6 py-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-foreground">
                            {item.availableStock} units
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            Min: {item.reorderPoint}
                          </span>
                        </div>
                        {/* Custom visual health bar */}
                        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              item.availableStock === 0
                                ? 'bg-transparent'
                                : item.availableStock <= item.reorderPoint
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                            }`}
                            style={{ width: `${stockRatio}%` }}
                          />
                        </div>
                        {item.reservedStock > 0 && (
                          <p className="text-[10px] text-muted-foreground">
                            {item.reservedStock} units reserved in orders
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Quick +/- Increments */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1 bg-muted/40 p-1 rounded-sm w-fit mx-auto border border-border/40">
                        <button
                          onClick={() => handleStockAdjust(item.id, -1)}
                          className="h-7 w-7 rounded-sm bg-background hover:bg-muted flex items-center justify-center text-foreground transition-all shadow-2xs active:scale-95"
                          title="Decrease 1"
                        >
                          <HugeiconsIcon icon={MinusPlus01Icon} className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold font-mono">
                          {item.availableStock}
                        </span>
                        <button
                          onClick={() => handleStockAdjust(item.id, +1)}
                          className="h-7 w-7 rounded-sm bg-background hover:bg-muted flex items-center justify-center text-foreground transition-all shadow-2xs active:scale-95"
                          title="Increase 1"
                        >
                          <HugeiconsIcon icon={PlusMinus01Icon} className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Unit Cost */}
                    <td className="px-6 py-4 text-right font-medium font-mono text-xs">
                      ${item.unitCost.toFixed(2)}
                    </td>

                    {/* Updated Time */}
                    <td className="px-6 py-4 text-right text-xs text-muted-foreground">
                      {item.updatedAt}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
