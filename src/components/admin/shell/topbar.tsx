'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Globe02Icon,
  Logout01Icon,
  Menu01Icon,
  PanelLeftIcon,
  Search01Icon,
  Settings05Icon,
} from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { adminNavGroups, findActiveItem } from '@/components/admin/sidebar/app-sidebar.data';
import { initials } from '@/components/admin/ui/format';
import { authClient } from '@/lib/auth-client';
import { useAdminUISidebarStore } from '@/stores/sidebar-store';

function useBreadcrumb() {
  const pathname = usePathname();
  const active = findActiveItem(pathname);
  let parent: string | null = null;
  let section: string | null = null;

  for (const group of adminNavGroups) {
    for (const item of group.items) {
      if (item.children?.some((c) => c.href.split('?')[0] === pathname)) {
        parent = item.title;
        section = group.label;
      }
    }
  }

  return { title: active?.title ?? 'Dashboard', parent, section };
}

export function Topbar() {
  const { title, parent, section } = useBreadcrumb();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const collapsed = useAdminUISidebarStore((s) => s.collapsed);
  const toggleCollapsed = useAdminUISidebarStore((s) => s.toggleCollapsed);
  const openMobile = useAdminUISidebarStore((s) => s.openMobile);
  const user = session?.user;
  const displayName = user?.name?.trim() || 'Admin';
  const displayEmail = user?.email || '';

  const signOut = async () => {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-foreground/8 bg-[#f6f5f1]/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <button className="shrink-0 lg:hidden" onClick={openMobile} aria-label="Open navigation">
        <HugeiconsIcon icon={Menu01Icon} size={20} />
      </button>

      <Button
        variant="ghost"
        size="icon"
        className="hidden shrink-0 lg:inline-flex"
        onClick={toggleCollapsed}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <HugeiconsIcon icon={PanelLeftIcon} size={20} />
      </Button>

      <div className="flex min-w-0 items-center gap-2 text-sm">
        <span className="hidden text-muted-foreground sm:block">Home</span>
        <span className="hidden text-muted-foreground/40 sm:block">/</span>
        {section && (
          <>
            <span className="hidden text-muted-foreground md:block">{section}</span>
            <span className="hidden text-muted-foreground/40 md:block">/</span>
          </>
        )}
        {parent && parent !== title && (
          <>
            <span className="text-muted-foreground">{parent}</span>
            <span className="text-muted-foreground/40">/</span>
          </>
        )}
        <span className="truncate font-semibold text-foreground">{title}</span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden items-center md:flex">
          <HugeiconsIcon
            icon={Search01Icon}
            size={16}
            className="pointer-events-none absolute left-3 text-muted-foreground"
          />
          <input
            type="search"
            placeholder="Search…"
            className="h-9 w-56 rounded-full border border-foreground/10 bg-white pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:w-64 focus:border-foreground/25 focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#4b6b56] text-xs font-bold text-[#f4f1e8] transition-opacity hover:opacity-90"
              aria-label="Account menu"
            >
              {initials(displayName)}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex items-center gap-3 py-2">
              <span className="grid size-9 place-items-center rounded-full bg-[#4b6b56] text-xs font-bold text-[#f4f1e8]">
                {initials(displayName)}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{displayName}</span>
                <span className="block truncate text-xs font-normal text-muted-foreground">
                  {displayEmail}
                </span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/" target="_blank" rel="noopener noreferrer">
                  <HugeiconsIcon icon={Globe02Icon} />
                  Visit storefront
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings">
                  <HugeiconsIcon icon={Settings05Icon} />
                  Settings
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onSelect={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <HugeiconsIcon icon={Logout01Icon} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
