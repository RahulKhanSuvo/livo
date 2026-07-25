import banner1 from '@/assets/hero/main-banner-7-desktop.webp';
import banner2 from '@/assets/hero/5-1.webp';
import banner3 from '@/assets/hero/6-1.webp';
import 'swiper/css/effect-fade';
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
