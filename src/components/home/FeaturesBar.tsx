'use client';

import React from 'react';
import { Container } from '@/components/shared/Container';
import { HugeiconsIcon } from '@hugeicons/react';
import { featuresBarData } from './data/features-bar.data';
import { cn } from '@/lib/utils';

export const FeaturesBar = ({ className }: { className?: string }) => {
  return (
    <section
      className={cn('w-full bg-white py-12 sm:py-16 border-y border-neutral-100', className)}
    >
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {featuresBarData.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center px-2">
              {/* Icon */}
              <div className="mb-4 text-neutral-800 flex items-center justify-center">
                <HugeiconsIcon icon={item.icon} size={32} strokeWidth={1.2} />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-medium text-neutral-900 mb-2 tracking-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed max-w-xs">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesBar;
