import { getShopHeaderDetails } from '@/components/shared/shopHeader.data';

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
}

export function getShopHeading(resolved: ResolvedShop): ShopHeading {
  const { room, type, subtype } = resolved;

  if (subtype) {
    const title = formatSlugToTitle(subtype);
    return {
      title,
      description: `Browse our curated collection of ${title.toLowerCase()}.`,
    };
  }

  if (type) {
    const title = formatSlugToTitle(type);
    return {
      title,
      description: `Browse our curated collection of ${title.toLowerCase()}.`,
    };
  }

  if (room) {
    const details = getShopHeaderDetails(room);
    return { title: details.title, description: details.description };
  }

  return {
    title: 'Shop All Furniture',
    description:
      'Explore our complete collection of modern, minimalist furniture designed for refined everyday living.',
  };
}
