'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import {
  DashboardSquare01Icon,
  PackageOpenIcon,
  StarIcon,
  RefreshIcon,
  GridIcon,
  UserAccountIcon,
} from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: IconSvgElement;
}

const navItems: NavItem[] = [
  { href: '/profile', label: 'Overview', icon: DashboardSquare01Icon },
  { href: '/profile/orders', label: 'Orders', icon: PackageOpenIcon },
  { href: '/profile/my-reviews', label: 'Reviews', icon: StarIcon },
  { href: '/profile/returns', label: 'Returns', icon: RefreshIcon },
  { href: '/profile/collections', label: 'Collections', icon: GridIcon },
  { href: '/profile/settings', label: 'Settings', icon: UserAccountIcon },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal scroll */}
      <nav
        className="flex md:hidden overflow-x-auto gap-2 pb-2 -mx-5 px-5"
        aria-label="Account navigation"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200',
                isActive
                  ? 'bg-[#4b6b56] text-[#f4f1e8] shadow-sm'
                  : 'bg-white text-[#4c4a45]/60 border border-[#161512]/10 hover:border-[#4b6b56]/30 hover:text-[#161512]'
              )}
            >
              <HugeiconsIcon icon={item.icon} size={14} strokeWidth={2} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Desktop: vertical rail */}
      <nav className="hidden md:block w-56 flex-shrink-0" aria-label="Account navigation">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#4b6b56] text-[#f4f1e8] shadow-sm'
                      : 'text-[#4c4a45]/60 hover:bg-[#f0ece4] hover:text-[#161512]'
                  )}
                >
                  <HugeiconsIcon icon={item.icon} size={18} strokeWidth={2} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
