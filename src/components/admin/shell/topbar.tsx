'use client';

import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  BellIcon,
  Calendar01Icon,
  Logout01Icon,
  Menu01Icon,
  PanelLeftIcon,
  PlusSignIcon,
  Search01Icon,
  Settings05Icon,
  UserGroupIcon,
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

export function Topbar({
  collapsed,
  onToggleCollapse,
  onOpenMobile,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onOpenMobile: () => void;
}) {
  const { title, parent, section } = useBreadcrumb();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-3 border-b border-foreground/8 bg-[#f6f5f1]/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden"
        onClick={onOpenMobile}
        aria-label="Open navigation"
      >
        <HugeiconsIcon icon={Menu01Icon} size={20} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="hidden shrink-0 lg:inline-flex"
        onClick={onToggleCollapse}
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

        <Button variant="ghost" size="icon" className="relative shrink-0" aria-label="Notifications">
          <HugeiconsIcon icon={BellIcon} size={20} />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-[#f6f5f1]" />
        </Button>

        <Button className="hidden shrink-0 gap-1.5 sm:inline-flex">
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          New
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full bg-[#4b6b56] text-xs font-bold text-[#f4f1e8] transition-opacity hover:opacity-90"
              aria-label="Account menu"
            >
              RS
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel className="flex items-center gap-3 py-2">
              <span className="grid size-9 place-items-center rounded-full bg-[#4b6b56] text-xs font-bold text-[#f4f1e8]">
                RS
              </span>
              <span>
                <span className="block text-sm font-semibold">Rahul Sharma</span>
                <span className="block text-xs font-normal text-muted-foreground">
                  rahul@livo.com
                </span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer">
                <HugeiconsIcon icon={UserGroupIcon} />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HugeiconsIcon icon={Settings05Icon} />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HugeiconsIcon icon={Calendar01Icon} />
                Activity
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" className="cursor-pointer">
              <HugeiconsIcon icon={Logout01Icon} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}