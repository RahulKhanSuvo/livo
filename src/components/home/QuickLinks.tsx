'use client';

import React from 'react';
import Link from 'next/link';
import { Container } from '@/components/shared/Container';
export interface QuickLinkItem {
  id: string;
  label: string;
  href: string;
}

export const quickLinksData: QuickLinkItem[] = [
  { id: '1', label: 'New Arrivals', href: '/collections/new-arrivals' },
  { id: '2', label: 'Bestsellers', href: '/collections/bestsellers' },
  { id: '3', label: 'Sale', href: '/collections/sale' },
  { id: '4', label: 'Small Spaces', href: '/collections/small-spaces' },
  { id: '5', label: 'Last Pieces', href: '/collections/last-pieces' },
  { id: '6', label: 'Gift Ideas', href: '/collections/gift-ideas' },
  { id: '7', label: 'Sustainable Choice', href: '/collections/sustainable-choice' },
  { id: '8', label: 'Outlet', href: '/collections/outlet' },
];

export const QuickLinks = () => {
  return (
    <section className="w-full bg-[#f0eeeb] py-16 sm:py-20 md:py-24">
      <Container className="flex flex-col items-center text-center">
        {/* Top Subtitle */}
        <span className=" uppercase tracking-[0.2em] font-medium text-neutral-800 mb-3">
          FIND YOUR FIT
        </span>

        {/* Main Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-normal text-neutral-900 tracking-tight mb-8 sm:mb-10">
          Quick links to help you choose the right piece faster
        </h2>

        {/* Centered Pill Buttons Grid / Flex Wrap */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 max-w-7xl">
          {quickLinksData.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-base font-normal text-neutral-700 transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:shadow-md sm:px-6 sm:py-3 sm:text-lg md:text-2xl lg:text-3xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default QuickLinks;
