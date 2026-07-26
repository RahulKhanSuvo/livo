import sofaIcon from '@/assets/navbar/sofa-bg.webp';
import chairIcon from '@/assets/navbar/chair-xx.webp';

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
