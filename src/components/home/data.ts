import banner1 from '@/assets/hero/main-banner-7-desktop.webp';
import banner2 from '@/assets/hero/5-1.webp';
import banner3 from '@/assets/hero/6-1.webp';
import sofa from '@/assets/department/sofa.webp';
import chair from '@/assets/department/chair.webp';
import table from '@/assets/department/table.webp';
import bed from '@/assets/department/bed.webp';
import storage from '@/assets/department/storage.webp';
import lighting from '@/assets/department/lightning.webp';

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
    title: 'Sofa',
    icon: sofa,
    href: '/sofa',
  },
  {
    title: 'Chair',
    icon: chair,
    href: '/chair',
  },
  {
    title: 'Table',
    icon: table,
    href: '/table',
  },
  {
    title: 'Bed',
    icon: bed,
    href: '/bed',
  },
  {
    title: 'Storage',
    icon: storage,
    href: '/storage',
  },
  {
    title: 'Lighting',
    icon: lighting,
    href: '/lighting',
  },
];
