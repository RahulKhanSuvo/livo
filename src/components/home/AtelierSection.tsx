'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import atelierImage from '@/assets/background/Shoptheroom.webp';
import { HugeiconsIcon } from '@hugeicons/react';
import { RulerIcon, LayersIcon, Sofa01Icon } from '@hugeicons/core-free-icons';
import { Container } from '../shared/Container';

export interface AtelierFeature {
  id: string;
  label: string;
  icon: typeof RulerIcon;
}

export const atelierFeatures: AtelierFeature[] = [
  {
    id: '1',
    label: 'Bespoke Spatial Planning',
    icon: RulerIcon,
  },
  {
    id: '2',
    label: 'Curated Material Selection',
    icon: LayersIcon,
  },
  {
    id: '3',
    label: 'Designer Furniture Sourcing',
    icon: Sofa01Icon,
  },
];

export const AtelierSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <Container className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh] overflow-hidden">
          {/* Left Hero Image Container */}
          <div className="relative lg:col-span-8 min-h-87.5 sm:min-h-120 lg:min-h-full w-full bg-neutral-100">
            <Image
              src={atelierImage}
              alt="Atelier interior design showcasing sofa and wooden console"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>

          {/* Right Dark Content Panel */}
          <div className="lg:col-span-4 bg-[#232b38] text-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start">
            {/* Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight mb-6 text-white">
              Atelier
            </h2>

            {/* Description */}
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-8 max-w-md">
              Personal design assistance to help you shape your ideal interior. We offer
              professional advice on layouts, materials, and furniture selection.
            </p>

            {/* Features List */}
            <ul className="space-y-4 mb-10 w-full">
              {atelierFeatures.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center text-white">
                    <HugeiconsIcon icon={item.icon} size={18} strokeWidth={1.5} />
                  </span>
                  <span className="text-xs sm:text-sm font-light tracking-wide text-neutral-200">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action Link */}
            <Link
              href="/atelier"
              className="text-xs sm:text-sm font-normal text-white underline underline-offset-4 decoration-white/70 hover:decoration-white transition-all"
            >
              Start here
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AtelierSection;
