import sofaIcon from '@/assets/navbar/sofa-bg.webp';
import chairIcon from '@/assets/navbar/chair-xx.webp';
import diningRoomIcon from '@/assets/images/Dining-1.webp';

export interface NavCategoryItem {
  name: string;
  href: string;
  icon: typeof sofaIcon;
}

export interface NavMenuLink {
  title: string;
  href: string;
  hasDropdown?: boolean;
  isSale?: boolean;
  dropdownData?: NavCategoryItem[];
}

export const livingRoomData: NavCategoryItem[] = [
  { name: 'Sofas', href: '/shop/living-room/sofas', icon: sofaIcon },
  { name: 'Chairs', href: '/shop/living-room/chairs', icon: chairIcon },
  { name: 'Tables', href: '/shop/living-room/tables', icon: sofaIcon },
  {
    name: 'TV Cabinets',
    href: '/shop/living-room/tv-cabinets',
    icon: sofaIcon,
  },
  { name: 'Lamps', href: '/shop/living-room/lamps', icon: chairIcon },
];

// hasDropdown=true renders NavigationMenuTrigger; false renders a plain Link.
// dropdownData provides icon-grid items for the generic mega menu.
// Links without dropdownData use a custom content component (e.g. DiningRoomContent).
export const navLinks: NavMenuLink[] = [
  {
    title: 'Living room',
    href: '/shop/living-room',
    hasDropdown: true,
    dropdownData: livingRoomData,
  },
  { title: 'Dining room', href: '/shop/dining-room', hasDropdown: true },
  { title: 'Bedroom', href: '/shop/bedroom', hasDropdown: true },
  { title: 'Decor', href: '/shop/decor' },
  { title: 'Lightning', href: '/shop/lightning', hasDropdown: true },
  { title: 'Design Service', href: '/design-service' },
  { title: 'Inspiration', href: '/inspiration' },
  { title: 'Sale', href: '/sale', isSale: true },
  { title: 'Blog', href: '/blog' },
];

// Rich link-based category columns + featured promo image for the Dining Room dropdown.
// Rendered by DiningRoomContent (not the generic MegaMenuGrid).
export const diningRoomData = {
  columns: [
    {
      category: 'Tables',
      categoryHref: '/shop/dining-room/tables',
      items: [
        { title: 'Dining Tables', href: '/shop/dining-room/dining-tables' },
        { title: 'Coffee Tables', href: '/shop/dining-room/coffee-tables' },
        { title: 'Side Tables', href: '/shop/dining-room/side-tables' },
        { title: 'Console Tables', href: '/shop/dining-room/console-tables' },
        { title: 'Outdoor Tables', href: '/shop/dining-room/outdoor-tables' },
        { title: 'View all Tables', href: '/shop/dining-room/tables' },
      ],
    },
    {
      category: 'Chairs',
      categoryHref: '/shop/dining-room/chairs',
      items: [
        { title: 'Dining Chairs', href: '/shop/dining-room/dining-chairs' },
        { title: 'Lounge Chairs', href: '/shop/dining-room/lounge-chairs' },
        { title: 'Outdoor Chairs', href: '/shop/dining-room/outdoor-chairs' },
        { title: 'Rocking Chairs', href: '/shop/dining-room/rocking-chairs' },
        { title: 'View all Chairs', href: '/shop/dining-room/chairs' },
      ],
    },
    {
      category: 'Stools',
      categoryHref: '/shop/dining-room/stools',
      items: [
        { title: 'Bar Stools', href: '/shop/dining-room/bar-stools' },
        { title: 'Counter Stools', href: '/shop/dining-room/counter-stools' },
        { title: 'Step Stools', href: '/shop/dining-room/step-stools' },
        { title: 'Wooden Stools', href: '/shop/dining-room/wooden-stools' },
        { title: 'Backless Stools', href: '/shop/dining-room/backless-stools' },
        { title: 'View all Stools', href: '/shop/dining-room/stools' },
      ],
    },
    {
      category: 'Benches',
      categoryHref: '/shop/dining-room/benches',
      items: [
        { title: 'Entryway Benches', href: '/shop/dining-room/entryway-benches' },
        { title: 'Dining Benches', href: '/shop/dining-room/dining-benches' },
        { title: 'Outdoor Benches', href: '/shop/dining-room/outdoor-benches' },
        { title: 'Storage Benches', href: '/shop/dining-room/storage-benches' },
        { title: 'Wooden Benches', href: '/shop/dining-room/wooden-benches' },
        { title: 'View all Benches', href: '/shop/dining-room/benches' },
      ],
    },
    {
      category: 'Storage',
      categoryHref: '/shop/dining-room/storage',
      items: [
        { title: 'Cabinets', href: '/shop/dining-room/cabinets' },
        { title: 'Bookshelves', href: '/shop/dining-room/bookshelves' },
        { title: 'Sideboards', href: '/shop/dining-room/sideboards' },
        { title: 'Dressers', href: '/shop/dining-room/dressers' },
        { title: 'View all Storage', href: '/shop/dining-room/storage' },
      ],
    },
    {
      category: 'Decor',
      categoryHref: '/shop/dining-room/decor',
      items: [
        { title: 'Wall Art', href: '/shop/dining-room/wall-art' },
        { title: 'Mirrors', href: '/shop/dining-room/mirrors' },
        { title: 'Rugs', href: '/shop/dining-room/rugs' },
        { title: 'View all Decor', href: '/shop/dining-room/decor' },
      ],
    },
  ],
  featuredImage: {
    src: diningRoomIcon,
    alt: 'Dining room set promo',
    caption: '50% off on Dining room Furniture',
    href: '/shop/dining-room/sale',
  },
};
