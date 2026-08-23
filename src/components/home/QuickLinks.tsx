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
  { id: '1', label: 'Sofas', href: '/shop/sofa' },
  { id: '2', label: 'Chairs', href: '/shop/chair' },
  { id: '3', label: 'Tables', href: '/shop/table' },
  { id: '4', label: 'Beds', href: '/shop/bed' },
  { id: '5', label: 'Storage', href: '/shop/storage' },
  { id: '6', label: 'Living Room', href: '/shop/living-room' },
  { id: '7', label: 'Dining Room', href: '/shop/dining-room' },
  { id: '8', label: 'Outdoor', href: '/shop/outdoor' },
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
