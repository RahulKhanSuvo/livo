'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { StarRating } from './StarRating';
import { TestimonialCard } from './TestimonialCard';
import { testimonialsData, Testimonial } from './testimonials.data';
import { Marquee } from '@/components/ui/marquee';

interface CustomerReviewsSectionProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  className?: string;
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  title = 'What Our Customers Say – Comfort That Lasts',
  subtitle = 'TRUSTED BY THOUSANDS',
  testimonials = testimonialsData,
  className,
}) => {
  return (
    <section className={cn('w-full bg-white py-12 sm:py-16', className)}>
      <div>
        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-2 mb-10 sm:mb-14">
          <StarRating rating={5} starClassName="h-4 w-4" />

          {subtitle && (
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-neutral-800 pt-1">
              {subtitle}
            </span>
          )}

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-neutral-900 tracking-tight max-w-2xl pt-1">
            {title}
          </h2>
        </div>

        {/* Cards Carousel / Grid */}
        <Marquee>
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} testimonial={item} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default CustomerReviewsSection;
