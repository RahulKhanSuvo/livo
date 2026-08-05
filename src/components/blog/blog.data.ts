import { StaticImageData } from 'next/image';
import diningEdit from '@/assets/images/Grid-photo-1.webp';
import greenSofa from '@/assets/editorial/green-sofa_bc362dbb-b66c-415b-a38d-937b01833a7c.webp';
import ambientLamps from '@/assets/editorial/lampy-kolaz.webp';
import organicStone from '@/assets/editorial/stolik-kolaz-1-mobile.webp';
import shopRoom from '@/assets/background/Shoptheroom.webp';
import saleTable from '@/assets/images/sale-table-picture.webp';

export interface BlogCategory {
  id: string;
  label: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  imageSrc: StaticImageData;
  imageAlt: string;
  featured?: boolean;
}

export const blogCategories: BlogCategory[] = [
  { id: 'all', label: 'All stories' },
  { id: 'inspiration', label: 'Inspiration' },
  { id: 'materials', label: 'Materials' },
  { id: 'care', label: 'Care & craft' },
  { id: 'atelier', label: 'Atelier' },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'art-of-a-layered-living-room',
    title: 'The art of a layered living room',
    excerpt:
      'How to compose a room that feels collected over time — mixing textures, heights, and quiet color.',
    category: 'Inspiration',
    author: 'Mara Lindqvist',
    authorRole: 'Head of Interior',
    date: '2026-07-28',
    readTime: '6 min read',
    imageSrc: greenSofa,
    imageAlt: 'A green sofa in a softly layered living room',
    featured: true,
  },
  {
    id: '2',
    slug: 'solid-oak-through-the-years',
    title: 'Solid oak, through the years',
    excerpt:
      'Why solid wood ages beautifully and how to care for a surface that only gets better with time.',
    category: 'Materials',
    author: 'Jonas Berg',
    authorRole: 'Material Specialist',
    date: '2026-07-21',
    readTime: '5 min read',
    imageSrc: organicStone,
    imageAlt: 'A natural oak side table in warm light',
  },
  {
    id: '3',
    slug: 'the-light-that-sets-the-mood',
    title: 'The light that sets the mood',
    excerpt:
      'Ambient lamps, warm tones, and dimmable scenes — a guide to lighting a room in three acts.',
    category: 'Inspiration',
    author: 'Elif Kaya',
    authorRole: 'Lighting Designer',
    date: '2026-07-14',
    readTime: '4 min read',
    imageSrc: ambientLamps,
    imageAlt: 'Ambient lamps glowing in an evening interior',
  },
  {
    id: '4',
    slug: 'from-workshop-to-doorstep',
    title: 'From workshop to doorstep',
    excerpt:
      'Follow a single armchair through our atelier — cutting, joinery, upholstery, and the final inspection.',
    category: 'Atelier',
    author: 'Oskar Holm',
    authorRole: 'Workshop Lead',
    date: '2026-07-07',
    readTime: '7 min read',
    imageSrc: shopRoom,
    imageAlt: 'An armchair being finished in the workshop',
  },
  {
    id: '5',
    slug: 'a-table-for-long-lunches',
    title: 'A table for long lunches',
    excerpt:
      'The dining room is where a home happens. Here is how to build one around a single honest table.',
    category: 'Inspiration',
    author: 'Mara Lindqvist',
    authorRole: 'Head of Interior',
    date: '2026-06-30',
    readTime: '5 min read',
    imageSrc: diningEdit,
    imageAlt: 'A dining table set for a long lunch',
  },
  {
    id: '6',
    slug: 'caring-for-your-sofa',
    title: 'Caring for your sofa',
    excerpt:
      'Feathers, fabric, and everyday spills — the simple habits that keep a sofa beautiful for decades.',
    category: 'Care & craft',
    author: 'Ida Sorensen',
    authorRole: 'Quality Lead',
    date: '2026-06-23',
    readTime: '4 min read',
    imageSrc: saleTable,
    imageAlt: 'A sofa upholstered in durable fabric',
  },
];
