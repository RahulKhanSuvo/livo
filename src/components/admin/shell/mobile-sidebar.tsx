'use client';

import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { AppSidebar } from '@/components/admin/sidebar/app-sidebar';
import { useAdminUISidebarStore } from '@/stores/sidebar-store';

export function MobileSidebar() {
  const mobileOpen = useAdminUISidebarStore((s) => s.mobileOpen);
  const setMobileOpen = useAdminUISidebarStore((s) => s.setMobileOpen);

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
      <SheetContent
        side="left"
        showCloseButton={false}
        className="w-72 border-r border-sidebar-border bg-sidebar p-0 text-sidebar-foreground sm:max-w-72"
      >
        <SheetTitle className="sr-only">Admin navigation</SheetTitle>
        <AppSidebar collapsed={false} />
      </SheetContent>
    </Sheet>
  );
}
