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
  material: string;
  width: number;
  height: number;
  depth: number;
  weightKg: number;
  assemblyRequired: boolean;
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = ({
  description,
  material,
  width,
  height,
  depth,
  weightKg,
  assemblyRequired,
}) => {
  return (
    <Accordion
      defaultValue={'description'}
      type="single"
      collapsible
      className="w-full border-none bg-white"
    >
      <AccordionItem className="data-open:bg-white" value="description">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900">
          Description
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed">
          {description}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="data-open:bg-white" value="dimensions">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900 rounded-none">
          Dimensions &amp; Weight
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed space-y-1 bg-white px-0">
          <p>Width: {width} cm</p>
          <p>Height: {height} cm</p>
          <p>Depth: {depth} cm</p>
          <p>Weight: {weightKg} kg</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="data-open:bg-white" value="materials">
        <AccordionTrigger className="hover:no-underline py-4 text-xs sm:text-sm font-normal text-neutral-900">
          Materials &amp; Assembly
        </AccordionTrigger>
        <AccordionContent className="text-xs text-neutral-600 font-light leading-relaxed space-y-1">
          <p>Material: {material}</p>
          <p>Assembly: {assemblyRequired ? 'Required' : 'No Assembly Needed'}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
