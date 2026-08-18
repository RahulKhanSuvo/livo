import banner1 from '@/assets/hero/main-banner-7-desktop.webp';
import banner2 from '@/assets/hero/5-1.webp';
import banner3 from '@/assets/hero/6-1.webp';
import sofa from '@/assets/department/sofa.webp';
import chair from '@/assets/department/chair.webp';
import table from '@/assets/department/table.webp';
import bed from '@/assets/department/bed.webp';
import storage from '@/assets/department/storage.webp';
import lighting from '@/assets/department/lightning.webp';
import editorialBanner from '@/assets/editorial/green-sofa_bc362dbb-b66c-415b-a38d-937b01833a7c.webp';
import organicStone from '@/assets/editorial/stolik-kolaz-1-mobile.webp';
import ambientLamps from '@/assets/editorial/lampy-kolaz.webp';

import { StaticImageData } from 'next/image';

export const heroData = [
  {
    title: 'Art Of Style',
    subtitle: 'Design for modern living',
    banner: banner1,
    cts: [
      {
        label: 'Explore Collections',
        href: '/collections',
      },
      {
        label: 'Shop',
        href: '/shop',
      },
    ],
  },
  {
    title: 'Urban Sophistication',
    subtitle: '',
    banner: banner2,
    cts: [
      {
        label: 'Explore Collections',
        href: '/collections',
      },
    ],
  },
  {
    title: 'Quite luxurious',
    subtitle: 'shape your atmosphere',
    banner: banner3,
    cts: [
      {
        label: 'Shop Lighting',
        href: '/lanp',
      },
    ],
  },
];
// department data
export const departmentData = [
  {
    title: 'Sofas',
    icon: sofa,
    href: '/shop/sofa',
  },
  {
    title: 'Chair',
    icon: chair,
    href: '/shop/chair',
  },
  {
    title: 'Table',
    icon: table,
    href: '/shop/table',
  },
  {
    title: 'Bed',
    icon: bed,
    href: '/shop/bed',
  },
  {
    title: 'Storage',
    icon: storage,
    href: '/shop/storage',
  },
  {
    title: 'Lighting',
    icon: lighting,
    href: '/shop/accessories/lighting',
  },
];
export interface EditorialBanner {
  id: string;
  title: string;
  ctaText: string;
  href: string;
  imageSrc: StaticImageData;
  alt: string;
  isFeatured?: boolean;
}

export const editorialBanners: EditorialBanner[] = [
  {
    id: 'curated-design',
    title: 'Curated Design\nfor Modern Living',
    ctaText: 'Shop Storage',
    href: '/shop/storage',
    imageSrc: editorialBanner,
    alt: 'Modern living room with green channel-tufted sofa',
    isFeatured: true,
  },
  {
    id: 'organic-textures',
    title: 'Organic Textures',
    ctaText: 'Shop Tables',
    href: '/shop/tables',
    imageSrc: organicStone,
    alt: 'Stone travertine table texture detail',
  },
  {
    id: 'ambient-art',
    title: 'Ambient Art',
    ctaText: 'Shop Light',
    href: '/shop/lighting',
    imageSrc: ambientLamps,
    alt: 'Modern architectural table lamps',
  },
];
