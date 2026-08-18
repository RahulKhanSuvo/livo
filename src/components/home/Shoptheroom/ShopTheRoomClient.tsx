'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import type { PublicRoomHotspot } from '@/actions/content/room-hotspots/room-hotspots.type';

const priceFmt = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function ShopTheRoomClient({
  imageUrl,
  hotspots,
}: {
  imageUrl: string;
  hotspots: PublicRoomHotspot[];
}) {
  return (
    <section className="w-full bg-[#f8f7f6] py-9">
      <h2 className="text-center pb-8 text-2xl font-medium">Shop the room</h2>
      <div className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt="Shop the Room"
          fill
          priority
          className="object-cover pointer-events-none select-none"
        />

        {hotspots.map((spot) => (
          <div
            key={spot.id}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <Popover>
              <PopoverTrigger
                className="group relative flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-black backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white data-[state=open]:bg-black data-[state=open]:text-white data-[state=open]:scale-110 shadow-lg"
                aria-label={`View product details for ${spot.product.name}`}
              >
                <span className="absolute -inset-1 rounded-full border border-white/60 animate-ping opacity-30" />
                <span className="h-2.5 w-2.5 rounded-full border-2 border-current bg-transparent" />
              </PopoverTrigger>

              <PopoverContent
                side={spot.cardPosition || 'top'}
                align="center"
                sideOffset={10}
                className="w-72 rounded-none border border-neutral-100 bg-white p-3 shadow-xl"
              >
                <Link href={spot.product.href} className="flex items-center gap-3 group">
                  <div className="relative h-14 w-14 shrink-0 bg-neutral-100 overflow-hidden">
                    {spot.product.image && (
                      <Image
                        src={spot.product.image}
                        alt={spot.product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  <div className="flex flex-col min-w-0 text-left">
                    <h4 className="text-xs font-medium text-neutral-900 truncate leading-snug group-hover:underline">
                      {spot.product.name}
                    </h4>

                    <div className="mt-1 flex items-center gap-2">
                      {spot.product.brand && (
                        <span className="text-xs text-neutral-400">{spot.product.brand}</span>
                      )}
                      <span className="text-xs font-semibold text-neutral-900">
                        {priceFmt.format(spot.product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              </PopoverContent>
            </Popover>
          </div>
        ))}
      </div>
      <div className="text-center pt-6">
        <Button className="text-black" variant={'editorial-link'} asChild>
          <Link href="/shop">See all inspirations</Link>
        </Button>
      </div>
    </section>
  );
}
