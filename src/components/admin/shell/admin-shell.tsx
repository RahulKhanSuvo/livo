import { DesktopSidebar } from '@/components/admin/shell/desktop-sidebar';
import { MobileSidebar } from '@/components/admin/shell/mobile-sidebar';
import { Topbar } from '@/components/admin/shell/topbar';

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full bg-[#f6f5f1]">
      <DesktopSidebar />
      <MobileSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="admin-scroll flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
