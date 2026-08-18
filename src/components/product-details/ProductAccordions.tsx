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
        <AccordionTrigger className="hover:no-underline py-4 text-lg font-normal text-neutral-900">
          Description
        </AccordionTrigger>
        <AccordionContent className="leading-relaxed font-normal">{description}</AccordionContent>
      </AccordionItem>

      <AccordionItem className="data-open:bg-white" value="dimensions">
        <AccordionTrigger className="hover:no-underline py-4 text-lg font-normal text-neutral-900 rounded-none">
          Dimensions &amp; Weight
        </AccordionTrigger>
        <AccordionContent className="leading-relaxed font-normal">
          <p>Width: {width} cm</p>
          <p>Height: {height} cm</p>
          <p>Depth: {depth} cm</p>
          <p>Weight: {weightKg} kg</p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem className="data-open:bg-white" value="materials">
        <AccordionTrigger className="hover:no-underline py-4 text-lg font-normal text-neutral-900">
          Materials &amp; Assembly
        </AccordionTrigger>
        <AccordionContent className="leading-relaxed font-normal">
          <p>Material: {material}</p>
          <p>Assembly: {assemblyRequired ? 'Required' : 'No Assembly Needed'}</p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="data-open:bg-white" value="delivery">
        <AccordionTrigger className="hover:no-underline py-4 text-lg font-normal text-neutral-900">
          Delivery &amp; Return Policy
        </AccordionTrigger>
        <AccordionContent className="leading-relaxed font-normal">
          <p>
            Material: Our team will ship your order within 5 business days. The time it takes to
            receive your order depends on the shipping method chosen at checkout.
          </p>
          <p>
            We hope you to love it, but if you need to make a return, breathe easy. Returns are
            always free and can be done in person or by mail.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
