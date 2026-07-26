'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { NavigationMenuContent } from '../../ui/navigation-menu';
import { Container } from '../../shared/Container';
import { diningRoomData } from './navbar.data';
import ArrowRight02Icon from '@hugeicons/core-free-icons/ArrowRight02Icon';

// Renders the Dining Room mega-menu dropdown content shown inside NavigationMenuContent.
// Uses NavigationMenuContent so Base UI teleports it into the header-anchored Popup.
export const DiningRoomContent = () => {
  // First 4 category columns (Tables, Chairs, Stools, Benches) in top row
  const topRowCategories = diningRoomData.columns.slice(0, 4);
  // Last 2 category columns (Storage, Decor) + "View all" link in bottom row
  const bottomRowCategories = diningRoomData.columns.slice(4, 6);

  return (
    <NavigationMenuContent
      className="
        data-[motion^=from-]:animate-in
        data-[motion^=from-]:fade-in
        data-[motion^=from-]:slide-in-from-top-2
        data-[motion^=to-]:animate-out
        data-[motion^=to-]:fade-out
        data-[motion^=to-]:slide-out-to-top-2
      "
    >
      <Container>
        <div className="flex gap-8 py-6">
          <div className="flex-7 flex flex-col gap-6">
            <div className="flex gap-2">
              {topRowCategories.map((group) => (
                <div key={group.category} className="flex-1 space-y-3">
                  <Link
                    href={group.categoryHref}
                    className="inline-flex items-center gap-1 text-lg font-medium"
                  >
                    <span>{group.category}</span>
                    <span className="">
                      <HugeiconsIcon icon={ArrowRight02Icon} />
                    </span>
                  </Link>

                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.href}
                          className="text-base hover:text-neutral-900 transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex gap-6 items-start">
              {bottomRowCategories.map((group) => (
                <div key={group.category} className="flex-1 space-y-3">
                  <Link
                    href={group.categoryHref}
                    className="inline-flex items-center gap-1 font-medium text-lg "
                  >
                    <span>{group.category}</span>
                    <HugeiconsIcon icon={ArrowRight02Icon} />
                  </Link>

                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <Link href={item.href} className="hover:text-neutral-900 transition-colors">
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="flex-2 pt-1">
                <Link
                  href="/shop/dining-room"
                  className="font-normal text-base text-neutral-900 hover:underline inline-block"
                >
                  View all Dining room
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-5 flex flex-col items-center self-start">
            <Link
              href={diningRoomData.featuredImage.href}
              className="group relative w-full aspect-2/1 overflow-hidden bg-neutral-100"
            >
              <Image
                src={diningRoomData.featuredImage.src}
                alt={diningRoomData.featuredImage.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </Link>

            <Link
              href={diningRoomData.featuredImage.href}
              className="mt-1 text-center text-basic hover:underline"
            >
              {diningRoomData.featuredImage.caption}
            </Link>
          </div>
        </div>
      </Container>
    </NavigationMenuContent>
  );
};
