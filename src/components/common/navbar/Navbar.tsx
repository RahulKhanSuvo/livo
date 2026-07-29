'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Menu01Icon, Cancel01Icon, Search01Icon } from '@hugeicons/core-free-icons';

import { Logo } from './Logo';
import { RightActions } from './RightActions';
import { SearchModal } from './SearchModal';
import { CartSheet } from '../cart/CartSheet';
import { navCategories, NavCategory } from './navbar.data';
import { Container } from '@/components/shared/Container';
import { DropdownPanel, DropdownAnimationType } from './DropdownPanel';
import { MegamenuPanel } from './MegamenuPanel';

interface NavbarProps {
  dropdownAnimationType?: DropdownAnimationType;
  megamenuAnimationType?: DropdownAnimationType;
}

export const Navbar = ({
  dropdownAnimationType = 'classic',
  megamenuAnimationType = 'classic',
}: NavbarProps) => {
  const [activeCategory, setActiveCategory] = useState<NavCategory | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (category: NavCategory) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (category.type !== 'link') {
      setActiveCategory(category);
    } else {
      setActiveCategory(null);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
    }, 120);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full bg-white border-b border-neutral-200"
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Tier Header Bar */}
        <div className="border-b border-neutral-100">
          <Container className="h-16 flex items-center justify-between relative">
            {/* Left: Mobile Toggle + Search Bar */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1 text-neutral-800 hover:text-black focus:outline-none lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <HugeiconsIcon icon={mobileMenuOpen ? Cancel01Icon : Menu01Icon} size={22} />
              </button>

              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-700 transition-colors py-1.5 px-3 rounded-full text-xs font-medium cursor-pointer bg-neutral-50 sm:bg-transparent border sm:border-0 border-neutral-200"
              >
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={16}
                  className="shrink-0 text-neutral-500"
                />
                <span className="hidden sm:inline text-neutral-400">Search</span>
              </button>
            </div>

            {/* Top Center: Brand Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <Logo />
            </div>

            {/* Right: Actions */}
            <RightActions
              onOpenSearch={() => setSearchOpen(true)}
              onOpenCart={() => setCartOpen(true)}
            />
          </Container>
        </div>

        {/* Bottom Tier: Centered Navigation Menu Links */}
        <div className="hidden lg:block relative">
          <Container className="h-12 flex items-center justify-center">
            <nav className="flex items-center space-x-7 xl:space-x-9 h-full">
              {navCategories.map((category) => {
                const isActive = activeCategory?.id === category.id;
                return (
                  <div
                    key={category.id}
                    className="relative flex items-center h-full"
                    onMouseEnter={() => handleMouseEnter(category)}
                  >
                    <Link
                      href={category.href}
                      className={`text-[11px] xl:text-[12px] font-bold tracking-[0.09em] uppercase transition-colors py-3 ${
                        isActive ? 'text-black font-extrabold' : 'text-neutral-800 hover:text-black'
                      }`}
                    >
                      {category.title}
                    </Link>

                    {/* Active / Hover underline indicator */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                    )}

                    {/* Modular Dropdown Panel */}
                    <DropdownPanel
                      category={category}
                      isActive={isActive}
                      onMouseEnter={() => {
                        if (timeoutRef.current) {
                          clearTimeout(timeoutRef.current);
                          timeoutRef.current = null;
                        }
                      }}
                      onMouseLeave={handleMouseLeave}
                      animationType={dropdownAnimationType}
                    />
                  </div>
                );
              })}
            </nav>
          </Container>
        </div>

        {/* Modular Megamenu Panel */}
        <MegamenuPanel
          activeCategory={activeCategory}
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
          animationType={megamenuAnimationType}
        />
      </header>

      {/* Dark backdrop overlay when mega menu or dropdown is active */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20.25 bg-black/40 z-40"
            onMouseEnter={handleMouseLeave}
          />
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Cart Sheet Drawer */}
      <CartSheet isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Mobile Drawer Menu with Shutter Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'calc(100vh - 80px)', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.2 },
            }}
            className="fixed inset-0 top-20 bg-white z-50 lg:hidden overflow-y-auto border-t border-neutral-200"
          >
            <motion.div
              initial={{ y: -15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 space-y-6"
            >
              {navCategories.map((category) => {
                const isExpanded = mobileExpandedCat === category.id;
                return (
                  <div key={category.id} className="border-b border-neutral-100 pb-4">
                    <div className="flex items-center justify-between">
                      <Link
                        href={category.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-semibold tracking-wider uppercase text-neutral-900"
                      >
                        {category.title}
                      </Link>
                      {(category.columns || category.dropdownItems) && (
                        <button
                          type="button"
                          onClick={() => setMobileExpandedCat(isExpanded ? null : category.id)}
                          className="text-neutral-500 hover:text-black p-1 text-xs font-medium"
                        >
                          {isExpanded ? '−' : '+'}
                        </button>
                      )}
                    </div>

                    {/* Expanded mobile items with Shutter Animation */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="mt-3 pl-4 space-y-4 overflow-hidden"
                        >
                          {category.columns?.map((col, cIdx) => (
                            <div key={cIdx} className="space-y-2">
                              {col.header && (
                                <h4 className="text-xs font-semibold uppercase text-neutral-500">
                                  {col.header}
                                </h4>
                              )}
                              <ul className="space-y-1.5 pl-2">
                                {col.items.map((item, iIdx) => (
                                  <li key={iIdx}>
                                    <Link
                                      href={item.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="text-sm text-neutral-700 hover:text-black block"
                                    >
                                      {item.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}

                          {category.dropdownItems?.map((item, dIdx) => (
                            <Link
                              key={dIdx}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-sm text-neutral-700 hover:text-black block py-1"
                            >
                              {item.title}
                            </Link>
                          ))}

                          {category.viewAllText && (
                            <div className="pt-2">
                              <Link
                                href={category.viewAllHref || category.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-xs font-bold uppercase underline text-black"
                              >
                                {category.viewAllText}
                              </Link>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
