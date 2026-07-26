'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Search01Icon, ShoppingBag01Icon, UserIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';

import { Container } from '../../shared/Container';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../ui/navigation-menu';
import { livingRoomData, navLinks } from './navbar.data';

export const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white py-2"
    >
      <div className="relative">
        <Container>
          {/* Top Bar: Logo, Search Input, and Right Actions */}
          <div className="flex h-16 items-center justify-between gap-6 ">
            {/* Logo */}
            <Link href="/" className="inline-block shrink-0">
              <h1 className="text-5xl font-semibold tracking-tight text-[#4c4a45]">LIVO</h1>
            </Link>
            <nav className="flex h-12 items-center justify-center">
              <NavigationMenu
                className="static max-w-none justify-center"
                anchor={headerRef}
                sideOffset={0}
              >
                <NavigationMenuList className="flex items-center gap-6 text-xs">
                  {navLinks.map((link) => {
                    if (link.hasDropdown) {
                      return (
                        <NavigationMenuItem key={link.title} className="static">
                          <NavigationMenuTrigger className="h-auto p-0 bg-transparent hover:bg-transparent data-popup-open:bg-white focus:bg-white text-base font-medium text-neutral-800 hover:text-black border-b border-transparent data-popup-open:border-black data-popup-open:font-medium transition-all gap-1 rounded-none cursor-pointer">
                            {link.title}
                          </NavigationMenuTrigger>

                          <NavigationMenuContent
                            className="
                              data-[motion^=from-]:animate-in
                              data-[motion^=from-]:fade-in
                              data-[motion^=from-]:slide-in-from-top-2
                              data-[motion^=to-]:animate-out
                              data-[motion^=to-]:fade-out
                              data-[motion^=to-]:slide-out-to-top-2
                            "
                          >
                            <Container>
                              <div className="grid grid-cols-5 gap-6 py-8">
                                {(link.dropdownData || livingRoomData).map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex flex-col items-center gap-3 transition"
                                  >
                                    {/* Light Grey Card Container for Image */}
                                    <div className="relative aspect-4/3 w-full bg-[#f7f7f7] rounded-sm flex items-center justify-center p-6 overflow-hidden">
                                      <Image
                                        src={item.icon}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                      />
                                    </div>

                                    <span className="text-xs text-neutral-800 group-hover:underline">
                                      {item.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </Container>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      );
                    }

                    return (
                      <NavigationMenuItem key={link.title}>
                        <Link
                          href={link.href}
                          className={`text-base transition-colors hover:text-black ${
                            link.isSale ? 'text-red-700 font-medium' : 'text-neutral-800'
                          }`}
                        >
                          {link.title}
                        </Link>
                      </NavigationMenuItem>
                    );
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* Right Actions: Currency, User Account, Cart */}
            <div className="flex items-center gap-5 ">
              <div>
                <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={1.5} />
              </div>

              {/* Account Link */}
              <Link href="/account" className="text-neutral-800 hover:text-black transition-colors">
                <HugeiconsIcon icon={UserIcon} size={20} strokeWidth={1.5} />
              </Link>

              {/* Cart Link with Badge */}
              <Link
                href="/cart"
                className="relative text-neutral-800 hover:text-black transition-colors"
              >
                <HugeiconsIcon icon={ShoppingBag01Icon} size={20} strokeWidth={1.5} />
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#4c4a45] text-[10px] font-medium text-white">
                  8
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Bar: Navigation Links & Full-Width Mega Menu */}
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
