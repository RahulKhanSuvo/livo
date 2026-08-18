'use client';

import { useCallback, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { AppSidebar } from '@/components/admin/sidebar/app-sidebar';
import { Topbar } from '@/components/admin/shell/topbar';
import { cn } from '@/lib/utils';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleToggleCollapse = useCallback(() => setCollapsed((v) => !v), []);
  const handleOpenMobile = useCallback(() => setMobileOpen(true), []);

  return (
    <div className="flex min-h-dvh w-full bg-[#f6f5f1]">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'sticky top-0 hidden h-dvh shrink-0 transition-[width] duration-300 ease-out lg:block',
          collapsed ? 'w-19' : 'w-64'
        )}
      >
        <AppSidebar collapsed={collapsed} />
      </aside>

      {/* Mobile sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-72 border-r border-sidebar-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-72"
        >
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <AppSidebar collapsed={false} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          onOpenMobile={handleOpenMobile}
        />
        <main className="admin-scroll flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
