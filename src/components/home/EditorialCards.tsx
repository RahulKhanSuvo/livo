'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { editorialCardsData } from './data/editorial-cards.data';

export const EditorialCards = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {editorialCardsData.map((card) => (
            <div key={card.id} className="flex flex-col w-full overflow-hidden group">
              {/* Image Frame */}
              <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Bottom Content Container with Matching Background */}
              <div
                className={`p-6 sm:p-8 flex flex-col items-start justify-between min-h-45 ${card.bgColor} ${
                  card.textColor || 'text-neutral-900'
                }`}
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-normal tracking-tight mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-light opacity-85 leading-relaxed max-w-xs">
                    {card.description}
                  </p>
                </div>

                {/* Explore Pill Button */}
                <Link
                  href={card.href}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-xs font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:bg-neutral-900 hover:text-white"
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditorialCards;
