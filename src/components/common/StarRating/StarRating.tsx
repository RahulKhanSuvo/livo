'use client';

import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Star } from '@hugeicons/core-free-icons';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating?: number;
  maxStars?: number;
  className?: string;
  starClassName?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating = 5,
  maxStars = 5,
  className,
  starClassName,
}) => {
  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <HugeiconsIcon
          key={index}
          icon={Star}
          className={cn(
            'h-3.5 w-3.5 fill-[#EAB308] text-[#EAB308]',
            index >= rating && 'fill-neutral-200 text-neutral-200',
            starClassName
          )}
        />
      ))}
    </div>
  );
};
