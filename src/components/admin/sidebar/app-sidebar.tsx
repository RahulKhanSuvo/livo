'use client';

import { useEffect, useState } from 'react';

import { Brand } from './brand';
import { SidebarNav } from './sidebar-nav';
import { adminNavGroups, type AdminNavGroup } from './app-sidebar.data';
import { useAdminUISidebarStore } from '@/stores/sidebar-store';
import { getOrderCountsAction } from '@/actions/order/getOrderCountsAction';
import { getReviewsStatsAction } from '@/actions/reviews/getReviewsStatsAction';

export function AppSidebar({ collapsed: collapsedProp }: { collapsed?: boolean } = {}) {
  const storeCollapsed = useAdminUISidebarStore((s) => s.collapsed);
  const collapsed = collapsedProp ?? storeCollapsed;

  const [ordersTotal, setOrdersTotal] = useState<number | null>(null);
  const [reviewsTotal, setReviewsTotal] = useState<number | null>(null);

  useEffect(() => {
    let active = true;
    Promise.all([getOrderCountsAction(), getReviewsStatsAction()])
      .then(([counts, reviews]) => {
        if (!active) return;
        if (counts?.all != null) setOrdersTotal(counts.all);
        if (reviews?.data?.total != null) setReviewsTotal(reviews.data.total);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const navGroups: AdminNavGroup[] = adminNavGroups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      if (item.href === '/admin/orders') {
        return { ...item, badge: ordersTotal != null ? String(ordersTotal) : item.badge };
      }
      if (item.href === '/admin/reviews') {
        return { ...item, badge: reviewsTotal != null ? String(reviewsTotal) : item.badge };
      }
      return item;
    }),
  }));

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-sidebar text-sidebar-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(217,142,99,0.16),transparent_60%)]"
      />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative flex h-full min-h-0 flex-col">
        <Brand collapsed={collapsed} />

        <div className="admin-scroll flex-1 overflow-y-auto px-2.5 pb-4">
          <nav>
            <SidebarNav
              groups={navGroups}
              collapsed={collapsed}
              defaultOpenPrefix="/admin/catalog"
            />
          </nav>
        </div>

        {/*<div className="p-2.5">
          {collapsed ? (
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                title="Settings"
                className="flex size-10 w-full items-center justify-center rounded-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <HugeiconsIcon icon={Settings05Icon} size={20} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                title="Log out"
                className="flex size-10 w-full items-center justify-center rounded-sm text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
              >
                <HugeiconsIcon icon={Logout02Icon} size={20} strokeWidth={1.75} />
              </button>
            </div>
          ) : (
            <div className="rounded-sm border border-sidebar-border bg-sidebar-accent p-3">
              <div className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-[#3d5747] text-xs font-bold text-sidebar-foreground">
                  RS
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="truncate text-[13px] font-semibold text-sidebar-foreground">
                    Rahul
                  </p>
                  <p className="truncate text-[11px] text-sidebar-foreground/50">Super Admin</p>
                </div>
                <button
                  type="button"
                  title="Profile"
                  className="grid size-7 shrink-0 place-items-center rounded-sm text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
                >
                  <HugeiconsIcon icon={UserGroupIcon} size={15} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
        </div>*/}
      </div>
    </div>
  );
}
