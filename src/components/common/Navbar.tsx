import React from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Menu01Icon,
  Search01Icon,
  ArrowDown01Icon,
  UserIcon,
  ShoppingBag01Icon,
} from '@hugeicons/core-free-icons';
import { Container } from '../shared/Container';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white">
      <Container>
        <nav className="flex h-20 items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="inline-block">
              <h1 className="font-sans text-4xl font-bold  uppercase tracking-wider text-[#4c4a45]">
                LIVO
              </h1>
            </Link>
          </div>

          {/* Search */}
          <div className="mx-4 hidden max-w-2xl flex-1 sm:block">
            <div className="relative w-full">
              <HugeiconsIcon
                icon={Search01Icon}
                size={18}
                strokeWidth={1.8}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
              />

              <input
                type="text"
                placeholder="What can we help you find?"
                className="h-11 w-full rounded-full border border-neutral-300 bg-transparent pl-11 pr-4 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-neutral-800 focus:outline-none"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Mobile Search */}
            <button
              type="button"
              className="p-1 text-neutral-800 hover:text-black sm:hidden"
              aria-label="Search"
            >
              <HugeiconsIcon icon={Search01Icon} size={20} strokeWidth={1.5} />
            </button>

            {/* Currency */}
            <button
              type="button"
              className="hidden items-center gap-1.5 text-xs font-medium text-neutral-800 transition-colors hover:text-black md:flex"
            >
              <span className="text-sm">🇺🇸</span>
              <span>USD</span>

              <HugeiconsIcon icon={ArrowDown01Icon} size={14} strokeWidth={1.5} />
            </button>

            {/* User */}
            <Link
              href="/account"
              className="p-1 text-neutral-800 transition-colors hover:text-black"
              aria-label="User Account"
            >
              <HugeiconsIcon icon={UserIcon} size={20} strokeWidth={1.5} />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-1 text-neutral-800 transition-colors hover:text-black"
              aria-label="Shopping Cart"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} size={20} strokeWidth={1.5} />

              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4c4a45] text-[10px] font-medium text-white">
                8
              </span>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
