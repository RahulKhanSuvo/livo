'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ChevronDownIcon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import type { AdminNavItem } from './app-sidebar.data';

function NavItemLink({
  item,
  depth = 0,
  collapsed,
  isChildActive,
  isParentActive,
  onClick,
}: {
  item: AdminNavItem;
  depth?: number;
  collapsed: boolean;
  isChildActive: boolean;
  isParentActive: boolean;
  onClick?: () => void;
}) {
  const isActive = isChildActive || (depth === 0 && isParentActive && !item.children);

  if (collapsed) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        title={item.title}
        className={cn(
          'group/nav relative flex h-10 w-full items-center justify-center rounded text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground',
          isActive &&
            'bg-sidebar-primary text-sidebar-primary-foreground hover:text-sidebar-primary-foreground'
        )}
      >
        <HugeiconsIcon icon={item.icon} size={20} strokeWidth={1.75} />
        <span className="pointer-events-none absolute left-full z-50 ml-3 hidden whitespace-nowrap rounded-lg bg-sidebar-primary px-2 py-1 text-xs font-medium text-sidebar-primary-foreground opacity-0 shadow-lg transition-opacity group-hover/nav:block group-hover/nav:opacity-100">
          {item.title}
        </span>
        {item.badge && (
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-[#e8a87c] ring-2 ring-sidebar" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        'relative flex h-9.5 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground',
        depth > 0 && 'h-8.5 pl-8 text-[13px]',
        isActive && 'bg-sidebar-primary font-semibold text-sidebar-primary-foreground shadow-sm',
        isParentActive && depth === 0 && !isActive && 'bg-sidebar-accent text-sidebar-foreground'
      )}
    >
      {isActive && depth > 0 && (
        <span className="absolute left-2.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
      )}
      <HugeiconsIcon
        icon={item.icon}
        size={18}
        strokeWidth={isActive ? 2 : 1.75}
        className={cn('shrink-0', isActive && 'text-sidebar-primary-foreground')}
      />
      <span className="truncate">{item.title}</span>
      {item.badge && (
        <span
          className={cn(
            'ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-sidebar-foreground/80',
            isActive && 'bg-black/10 text-sidebar-primary-foreground'
          )}
        >
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function NavGroupItem({
  item,
  collapsed,
  depth = 0,
  defaultOpen = false,
  onNavigate,
}: {
  item: AdminNavItem;
  collapsed: boolean;
  depth?: number;
  defaultOpen?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const hasChildren = !!item.children?.length;
  const childActive = item.children?.some((c) => c.href.split('?')[0] === pathname);
  const isParentActive = pathname === item.href.split('?')[0];
  const [open, setOpen] = useState(defaultOpen || childActive || isParentActive);

  if (!hasChildren || collapsed) {
    return (
      <NavItemLink
        item={item}
        depth={depth}
        collapsed={collapsed}
        isChildActive={false}
        isParentActive={isParentActive}
        onClick={onNavigate}
      />
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex h-9.5 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground',
          (childActive || isParentActive) && 'bg-sidebar-accent text-sidebar-foreground'
        )}
      >
        <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="truncate">{item.title}</span>
        <span
          className={cn(
            'ml-auto grid size-5 shrink-0 place-items-center rounded-md text-sidebar-foreground/50 transition-transform duration-300',
            open && 'rotate-180'
          )}
        >
          <HugeiconsIcon icon={ChevronDownIcon} size={14} strokeWidth={2} />
        </span>
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative mt-0.5 space-y-0.5 py-1">
            <span className="absolute bottom-2 top-2 left-4.75 w-px bg-sidebar-border" />
            {item.children?.map((child) => {
              const childPath = child.href.split('?')[0];
              const active = childPath === pathname;
              return (
                <NavItemLink
                  key={child.href}
                  item={child}
                  depth={depth + 1}
                  collapsed={false}
                  isChildActive={active}
                  isParentActive={false}
                  onClick={onNavigate}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SidebarNav({
  groups,
  collapsed,
  defaultOpenPrefix,
  onNavigate,
}: {
  groups: { label: string; items: AdminNavItem[] }[];
  collapsed: boolean;
  defaultOpenPrefix?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <div key={group.label}>
          {!collapsed && (
            <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-[0.22em] text-sidebar-foreground/40 uppercase">
              {group.label}
            </p>
          )}
          {collapsed && <div className="mx-1 mb-2 h-px bg-sidebar-border/60" />}
          <div className="space-y-0.5">
            {group.items.map((item) => (
              <NavGroupItem
                key={item.href + item.title}
                item={item}
                collapsed={collapsed}
                defaultOpen={defaultOpenPrefix ? pathname.startsWith(defaultOpenPrefix) : false}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
