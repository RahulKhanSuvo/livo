'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { StarRating } from './StarRating';
import { Testimonial } from './testimonials.data';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  const { quote, author, verified, rating, productThumbnail } = testimonial;

  return (
    <div
      className={cn(
        'flex flex-col justify-between rounded-xl bg-[#F8F7F5] p-6 sm:p-8 min-w-70 sm:min-w-85 max-w-137.5 shrink-0 lg:flex-1 transition-all',
        className
      )}
    >
      {/* Quote Text */}
      <p className="text-xs sm:text-sm text-neutral-800 font-light leading-relaxed mb-8">{quote}</p>

      {/* Footer Info: Product Image + Author & Rating */}
      <div className="flex items-center gap-3 pt-4">
        {/* Product Thumbnail */}
        {productThumbnail && (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-white border border-neutral-200/60">
            <Image
              src={productThumbnail}
              alt={`${author}'s purchased product`}
              fill
              sizes="40px"
              className="object-cover object-center"
            />
          </div>
        )}

        {/* Author & Stars */}
        <div className="flex flex-col justify-center space-y-1">
          <span className="text-xs text-neutral-600 font-light">
            - {author}
            {verified && <span className="text-neutral-500">, verified customer</span>}
          </span>
          <StarRating rating={rating} />
        </div>
      </div>
    </div>
  );
};
