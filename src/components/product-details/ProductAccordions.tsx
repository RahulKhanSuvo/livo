'use client';

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ProductAccordionsProps {
  description: string;
  specifications: {
    material: { frame: string; seat: string; finish: string };
    dimensions: { width: number; height: number; depth: number };
    weight?: string;
    assemblyRequired?: boolean;
  };
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({
  description,
  specifications,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="description">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900">
          Description
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed">
          {description}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="dimensions">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900">
          Dimensions & Weight
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed space-y-1">
          <p>Width: {specifications.dimensions.width} cm</p>
          <p>Height: {specifications.dimensions.height} cm</p>
          <p>Depth: {specifications.dimensions.depth} cm</p>
          <p>Weight: {specifications.weight ?? 'N/A'}</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="materials">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900">
          Materials & Finish
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed space-y-1">
          <p>Frame: {specifications.material.frame}</p>
          <p>Seat: {specifications.material.seat}</p>
          <p>Finish: {specifications.material.finish}</p>
          <p>
            Assembly:{' '}
            {specifications.assemblyRequired === undefined
              ? 'N/A'
              : specifications.assemblyRequired
                ? 'Required'
                : 'No Assembly Needed'}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
