export interface EditorialCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  bgColor: string; // Dynamic background color for text box
  textColor?: string; // Optional custom text color
}

export const editorialCardsData: EditorialCard[] = [
  {
    id: 'pure-detail',
    title: 'Pure Detail',
    description: 'Perfection in every stitch and fold.',
    imageSrc: '/images/editorial/leather-stitch.jpg',
    imageAlt: 'Close up of stitched brown leather and fabric chair',
    href: '/collections/pure-detail',
    bgColor: 'bg-[#b6a195]', // Warm brown/tan
    textColor: 'text-white',
  },
  {
    id: 'solid-form',
    title: 'Solid Form',
    description: 'Grounding your interior with natural textures.',
    imageSrc: '/images/editorial/wooden-tables.jpg',
    imageAlt: 'Collection of solid wood coffee and side tables',
    href: '/collections/solid-form',
    bgColor: 'bg-[#c5cbce]', // Muted gray
    textColor: 'text-neutral-900',
  },
  {
    id: 'soft-light',
    title: 'Soft Light',
    description: 'Setting the mood with effortless elegance.',
    imageSrc: '/images/editorial/standing-lamp.jpg',
    imageAlt: 'Elegant modern standing lamp in room corner',
    href: '/collections/soft-light',
    bgColor: 'bg-[#f0eee9]', // Soft off-white / beige
    textColor: 'text-neutral-900',
  },
];
