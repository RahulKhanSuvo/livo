'use client';

import { useRef } from 'react';

import { Container } from '../../shared/Container';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { RightActions } from './RightActions';

export const Navbar = () => {
  const headerRef = useRef<HTMLElement>(null);
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white py-2"
    >
      <div className="relative">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6">
            <Logo />
            <NavLinks anchor={headerRef} sideOffset={0} />
            <RightActions />
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Navbar;
