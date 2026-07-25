import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const containerVariants = cva('mx-auto w-full px-4 sm:px-6 lg:px-18', {
  variants: {
    size: {
      xs: 'max-w-3xl',
      sm: 'max-w-5xl',
      md: 'max-w-6xl',
      lg: 'max-w-[1900px]',
      full: 'max-w-full',
      prose: 'max-w-prose',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof containerVariants> {}

function Container({ className, size, ...props }: ContainerProps) {
  return (
    <div data-slot="container" className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { Container, containerVariants };
