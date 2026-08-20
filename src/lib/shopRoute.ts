import type { StaticImageData } from 'next/image';
import {
  getShopHeaderDetails,
  CATEGORY_THEMES,
  CATEGORY_IMAGES,
} from '@/components/shared/shopHeader.data';

const ROOM_SLUGS = new Set([
  'living-room',
  'living',
  'dining-room',
  'dining',
  'bedroom',
  'outdoor',
  'accessories',
  'storage-consoles',
  'storage',
]);

export interface ResolvedShop {
  room?: string;
  type?: string;
  subtype?: string;
}

export function resolveShopSlugs(slugs: string[] = []): ResolvedShop {
  const room = slugs.find((s) => ROOM_SLUGS.has(s));
  const rest = slugs.filter((s) => s !== room);
  return {
    room,
    type: rest[0],
    subtype: rest[1],
  };
}

function formatSlugToTitle(slug?: string): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface ShopHeading {
  title: string;
  description: string;
  imageSrc?: string | StaticImageData;
  bgColor?: string;
  titleColor?: string;
  descColor?: string;
}

export function getShopHeading(resolved: ResolvedShop): ShopHeading {
  const { room, type, subtype } = resolved;
  const theme = (room && CATEGORY_THEMES[room]) || CATEGORY_THEMES['default'];

  if (subtype) {
    const title = formatSlugToTitle(subtype);
    return {
      title,
      description: `Browse our curated collection of ${title.toLowerCase()}.`,
      imageSrc: (room && CATEGORY_IMAGES[room]) || undefined,
      bgColor: theme.bg,
      titleColor: theme.title,
      descColor: theme.muted,
    };
  }

  if (type) {
    const title = formatSlugToTitle(type);
    return {
      title,
      description: `Browse our curated collection of ${title.toLowerCase()}.`,
      imageSrc: (room && CATEGORY_IMAGES[room]) || undefined,
      bgColor: theme.bg,
      titleColor: theme.title,
      descColor: theme.muted,
    };
  }

  if (room) {
    const details = getShopHeaderDetails(room);
    return {
      title: details.title,
      description: details.description,
      imageSrc: details.imageSrc,
      bgColor: details.theme?.bg,
      titleColor: details.theme?.title,
      descColor: details.theme?.muted,
    };
  }

  return {
    title: 'Shop All Furniture',
    description:
      'Explore our complete collection of modern, minimalist furniture designed for refined everyday living.',
    bgColor: theme.bg,
    titleColor: theme.title,
    descColor: theme.muted,
  };
}
