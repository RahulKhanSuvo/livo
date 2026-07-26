import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../../ui/navigation-menu';
import { Container } from '../../shared/Container';
import { DiningRoomContent } from './DiningRoomContent';
import { livingRoomData, navLinks } from './navbar.data';

interface NavLinksProps {
  anchor: React.RefObject<Element | null>;
  sideOffset?: number;
}

// Grid of category icons/images shown inside NavigationMenuContent.
// NavigationMenuContent is teleported into the Viewport (inside Popup/Positioner/Portal)
// so it renders full-width below the header via the anchor ref.
const MegaMenuGrid = ({ link }: { link: (typeof navLinks)[number] }) => (
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
      <div className="grid grid-cols-5 gap-6 py-8">
        {(link.dropdownData || livingRoomData).map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group flex flex-col items-center gap-3 transition"
          >
            <div className="relative aspect-4/3 w-full bg-[#f7f7f7] rounded-sm flex items-center justify-center p-6 overflow-hidden">
              <Image
                src={item.icon}
                alt={item.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs text-neutral-800 group-hover:underline">{item.name}</span>
          </Link>
        ))}
      </div>
    </Container>
  </NavigationMenuContent>
);

// Renders a nav item with a hover-triggered dropdown.
// The popup is anchored to the full <header> (via the anchor prop on NavigationMenu),
// not to this individual trigger — so the dropdown spans full-width below the navbar.
const NavItemWithDropdown = ({ link }: { link: (typeof navLinks)[number] }) => (
  <NavigationMenuItem className="static">
    <NavigationMenuTrigger className="h-auto p-0 bg-transparent hover:bg-transparent data-popup-open:bg-white focus:bg-white text-base font-medium text-neutral-800 hover:text-black data-popup-open:font-medium transition-all gap-1 rounded-none cursor-pointer">
      <span className="relative inline-block">
        {link.title}
        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-right scale-x-0 bg-neutral-900 transition-transform duration-300 ease-out group-hover/navigation-menu-trigger:origin-left group-hover/navigation-menu-trigger:scale-x-100 group-data-popup-open/navigation-menu-trigger:origin-left group-data-popup-open/navigation-menu-trigger:scale-x-100" />
      </span>
    </NavigationMenuTrigger>
    {link.title === 'Dining room' ? <DiningRoomContent /> : <MegaMenuGrid link={link} />}
  </NavigationMenuItem>
);

const NavItemPlain = ({ link }: { link: (typeof navLinks)[number] }) => (
  <NavigationMenuItem>
    <Link
      href={link.href}
      className={`text-base transition-colors hover:text-black ${
        link.isSale ? 'text-red-700 font-medium' : 'text-neutral-800'
      }`}
    >
      {link.title}
    </Link>
  </NavigationMenuItem>
);

// anchor is passed to NavigationMenu → forwarded to Positioner.
// It should be a ref to <header> so mega menus position below the full navbar, not per-trigger.
// sideOffset controls the gap between the navbar bottom edge and the popup top edge.
export const NavLinks = ({ anchor, sideOffset }: NavLinksProps) => (
  <nav className="flex h-12 items-center justify-center">
    <NavigationMenu
      className="static max-w-none justify-center"
      anchor={anchor}
      sideOffset={sideOffset}
    >
      <NavigationMenuList className="flex items-center gap-6 text-xs">
        {navLinks.map((link) =>
          link.hasDropdown ? (
            <NavItemWithDropdown key={link.title} link={link} />
          ) : (
            <NavItemPlain key={link.title} link={link} />
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
);
