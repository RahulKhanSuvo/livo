import livingRoomImage from '@/assets/navbar/livingRoom.png';
import diningRoomImage from '@/assets/navbar/dinningRoom.png';
import { StaticImageData } from 'next/image';
export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavColumn {
  header?: string;
  headerHref?: string;
  items: NavSubItem[];
}

export interface PromoBanner {
  image: StaticImageData | string;
}

export interface NavCategory {
  id: string;
  title: string;
  href: string;
  type: 'megamenu' | 'dropdown' | 'link';
  columns?: NavColumn[];
  dropdownItems?: NavSubItem[];
  promos?: PromoBanner[];
  viewAllText?: string;
  viewAllHref?: string;
}

export const navCategories: NavCategory[] = [
  {
    id: 'living',
    title: 'LIVING',
    href: '/shop/living-room',
    type: 'megamenu',
    columns: [
      {
        header: 'Sofas',
        headerHref: '/shop/living-room/sofa',
        items: [
          { title: 'Sectional Sofas', href: '/shop/living-room/sofa/sectional-sofas' },
          { title: 'Modular Sofas', href: '/shop/living-room/sofa/modular-sofas' },
          { title: 'Loveseats', href: '/shop/living-room/sofa/loveseats' },
          { title: 'Sofa Beds', href: '/shop/living-room/sofa/sofa-beds' },
          { title: 'Recliner Sofas', href: '/shop/living-room/sofa/recliner-sofas' },
        ],
      },
      {
        header: 'Chairs',
        headerHref: '/shop/living-room/chair',
        items: [
          { title: 'Accent Chairs', href: '/shop/living-room/chair/accent-chairs' },
          { title: 'Lounge Chairs', href: '/shop/living-room/chair/lounge-chairs' },
          { title: 'Armchairs', href: '/shop/living-room/chair/armchairs' },
          { title: 'Recliners', href: '/shop/living-room/chair/recliners' },
          { title: 'Swivel Chairs', href: '/shop/living-room/chair/swivel-chairs' },
        ],
      },
      {
        header: 'Tables',
        headerHref: '/shop/living-room/table',
        items: [
          { title: 'Coffee Tables', href: '/shop/living-room/table/coffee-tables' },
          { title: 'Side Tables', href: '/shop/living-room/table/side-tables' },
          { title: 'Console Tables', href: '/shop/living-room/table/console-tables' },
          { title: 'Nesting Tables', href: '/shop/living-room/table/nesting-tables' },
          { title: 'End Tables', href: '/shop/living-room/table/end-tables' },
        ],
      },
      {
        items: [
          { title: 'TV Units', href: '/shop/living-room/tv-units' },
          { title: 'Bookcases', href: '/shop/living-room/bookcases' },
          { title: 'Ottomans & Benches', href: '/shop/living-room/ottomans-benches' },
        ],
      },
    ],
    viewAllText: 'VIEW ALL LIVING',
    viewAllHref: '/shop/living-room',
    promos: [
      {
        image: livingRoomImage,
      },
    ],
  },
  {
    id: 'dining',
    title: 'DINING',
    href: '/shop/dining-room',
    type: 'megamenu',
    columns: [
      {
        header: 'Dining Tables',
        headerHref: '/shop/dining-room/table',
        items: [
          { title: 'Round Dining Tables', href: '/shop/dining-room/table/round-dining-tables' },
          {
            title: 'Rectangular Dining Tables',
            href: '/shop/dining-room/table/rectangular-dining-tables',
          },
          {
            title: 'Extendable Dining Tables',
            href: '/shop/dining-room/table/extendable-dining-tables',
          },
          { title: 'Counter Height Tables', href: '/shop/dining-room/table/counter-height-tables' },
        ],
      },
      {
        header: 'Dining Chairs',
        headerHref: '/shop/dining-room/chair',
        items: [
          { title: 'Upholstered Chairs', href: '/shop/dining-room/chair/upholstered-chairs' },
          { title: 'Wooden Chairs', href: '/shop/dining-room/chair/wooden-chairs' },
          { title: 'Arm Dining Chairs', href: '/shop/dining-room/chair/arm-dining-chairs' },
          { title: 'Side Chairs', href: '/shop/dining-room/chair/side-chairs' },
        ],
      },
      {
        header: 'Bar Furniture',
        headerHref: '/shop/dining-room/bar-furniture',
        items: [
          { title: 'Bar Stools', href: '/shop/dining-room/bar-furniture/bar-stools' },
          { title: 'Bar Tables', href: '/shop/dining-room/bar-furniture/bar-tables' },
        ],
      },
      {
        items: [
          { title: 'Benches', href: '/shop/dining-room/benches' },
          { title: 'Sideboards & Buffets', href: '/shop/dining-room/sideboards-buffets' },
        ],
      },
    ],
    viewAllText: 'VIEW ALL DINING',
    viewAllHref: '/shop/dining-room',
    promos: [
      {
        image: diningRoomImage,
      },
      {
        image:
          'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'storage-consoles',
    title: 'STORAGE & CONSOLES',
    href: '/shop/storage-consoles',
    type: 'dropdown',
    dropdownItems: [
      { title: 'TV Units', href: '/shop/storage/tv-units' },
      { title: 'Sideboards', href: '/shop/storage/sideboards' },
      { title: 'Cabinets', href: '/shop/storage/cabinets' },
      { title: 'Bookcases', href: '/shop/storage/bookcases' },
      { title: 'Shelving Units', href: '/shop/storage/shelving-units' },
      { title: 'Console Tables', href: '/shop/storage/console-tables' },
    ],
  },
  {
    id: 'bedroom',
    title: 'BEDROOM',
    href: '/shop/bedroom',
    type: 'dropdown',
    dropdownItems: [
      { title: 'Beds', href: '/shop/bedroom/bed' },
      { title: 'Nightstands', href: '/shop/bedroom/nightstands' },
      { title: 'Dressers', href: '/shop/bedroom/dressers' },
      { title: 'Wardrobes', href: '/shop/bedroom/wardrobes' },
      { title: 'Chest of Drawers', href: '/shop/bedroom/chest-of-drawers' },
      { title: 'Bedroom Benches', href: '/shop/bedroom/bedroom-benches' },
    ],
  },
  {
    id: 'outdoor',
    title: 'OUTDOOR',
    href: '/shop/outdoor',
    type: 'dropdown',
    dropdownItems: [
      { title: 'Lounge Sets', href: '/shop/outdoor/lounge-sets' },
      { title: 'Outdoor Sofas', href: '/shop/outdoor/sofa/outdoor-sofas' },
      { title: 'Outdoor Chairs', href: '/shop/outdoor/chair/outdoor-chairs' },
      { title: 'Outdoor Dining Sets', href: '/shop/outdoor/outdoor-dining-sets' },
      { title: 'Outdoor Tables', href: '/shop/outdoor/outdoor-tables' },
      { title: 'Sun Loungers', href: '/shop/outdoor/sun-loungers' },
    ],
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    href: '/shop/accessories',
    type: 'dropdown',
    dropdownItems: [
      { title: 'Rugs', href: '/shop/accessories/rugs' },
      { title: 'Lighting', href: '/shop/accessories/lighting' },
      { title: 'Mirrors', href: '/shop/accessories/mirrors' },
      { title: 'Wall Art', href: '/shop/accessories/wall-art' },
      { title: 'Cushions', href: '/shop/accessories/cushions' },
      { title: 'Throws', href: '/shop/accessories/throws' },
      { title: 'Vases', href: '/shop/accessories/vases' },
      { title: 'Decorative Objects', href: '/shop/accessories/decorative-objects' },
    ],
  },
  {
    id: 'blog',
    title: 'BLOG',
    href: '/blog',
    type: 'link',
  },
];
