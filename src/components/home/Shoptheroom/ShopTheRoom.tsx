'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import roomImage from '@/assets/background/Shoptheroom.webp';
import { Container } from '@/components/shared/Container';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { roomHotspots } from './shop-the-room.data';
import { Button } from '@/components/ui/button';

export const ShopTheRoom = () => {
  return (
    <section className="w-full bg-[#f8f7f6] py-9">
      {/*title*/}
      <h2 className="text-center pb-8 text-2xl font-medium ">Shop the room</h2>
      <Container size="lg" className="relative h-screen overflow-hidden">
        {/* Background Room Image */}
        <div className="relative w-full h-full">
          <Image
            className="object-cover pointer-events-none select-none"
            src={roomImage}
            alt="Shop the Room"
            fill
            priority
          />
        </div>

        {/* Hotspots using shadcn Popover */}
        {roomHotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <Popover defaultOpen={spot.id === '1'}>
              {/* Trigger Hotspot Button */}
              <PopoverTrigger
                className="group relative flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:scale-110 shadow-lg"
                aria-label={`View product details for ${spot.product.title}`}
              >
                {/* Outer pulse effect */}
                <span className="absolute -inset-1 rounded-full border border-white/60 animate-ping opacity-30" />

                {/* Inner dot */}
                <span className="h-2.5 w-2.5 rounded-full border-2 border-current bg-transparent" />
              </PopoverTrigger>

              {/* Popover Content Box */}
              <PopoverContent
                side={spot.cardPosition || 'top'}
                align="center"
                sideOffset={10}
                className="w-72 rounded-none border border-neutral-100 bg-white p-3 shadow-xl"
              >
                <Link href={spot.product.href} className="flex items-center gap-3 group">
                  {/* Thumbnail Image */}
                  <div className="relative h-14 w-14 shrink-0 bg-neutral-100 overflow-hidden">
                    <Image
                      src={spot.product.imageUrl}
                      alt={spot.product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col min-w-0 text-left">
                    <h4 className="text-xs font-medium text-neutral-900 truncate leading-snug group-hover:underline">
                      {spot.product.title}
                    </h4>

                    {/* Price and Badge */}
                    <div className="mt-1 flex items-center gap-2">
                      {spot.product.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          {spot.product.originalPrice}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-neutral-900">
                        {spot.product.salePrice}
                      </span>

                      {spot.product.discountBadge && (
                        <span className="rounded bg-rose-600 px-1.5 py-0.5 text-[10px] font-medium text-white">
                          {spot.product.discountBadge}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </Container>
      <div className="text-center pt-6">
        <Button className="text-black" variant={'editorial-link'} asChild>
          <Link href="/shop">See all inspirations</Link>
        </Button>
      </div>
    </section>
  );
};

export default ShopTheRoom;
