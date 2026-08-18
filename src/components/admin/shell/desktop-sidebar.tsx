'use client';

import { AppSidebar } from '@/components/admin/sidebar/app-sidebar';
import { useAdminUISidebarStore } from '@/stores/sidebar-store';
import { cn } from '@/lib/utils';

export function DesktopSidebar() {
  const collapsed = useAdminUISidebarStore((s) => s.collapsed);

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 transition-[width] duration-300 ease-out lg:block',
        collapsed ? 'w-19' : 'w-64'
      )}
    >
      <AppSidebar />
    </aside>
  );
}
