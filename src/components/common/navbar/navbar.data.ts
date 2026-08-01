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
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  image: string;
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
  // {
  //   id: 'new-arrivals',
  //   title: 'NEW ARRIVALS',
  //   href: '/shop/new-arrivals',
  //   type: 'megamenu',
  //   columns: [
  //     {
  //       header: 'New In Categories',
  //       items: [
  //         { title: 'New in Living Room', href: '/shop/new-arrivals/living' },
  //         { title: 'New in Dining Room', href: '/shop/new-arrivals/dining' },
  //         { title: 'New in Bedroom', href: '/shop/new-arrivals/bedroom' },
  //         { title: 'New Outdoor Releases', href: '/shop/new-arrivals/outdoor' },
  //       ],
  //     },
  //     {
  //       header: 'Featured Arrivals',
  //       items: [
  //         { title: 'Travertine Collection', href: '/shop/new-arrivals/travertine' },
  //         { title: 'Bouclé Sofas & Chairs', href: '/shop/new-arrivals/boucle' },
  //         { title: 'Solid Walnut Furniture', href: '/shop/new-arrivals/walnut' },
  //       ],
  //     },
  //   ],
  //   viewAllText: 'VIEW ALL NEW ARRIVALS',
  //   viewAllHref: '/shop/new-arrivals',
  //   promos: [
  //     {
  //       title: 'NEW SEASON COLLECTION',
  //       subtitle: 'Discover contemporary designs crafted for modern living.',
  //       ctaText: 'SHOP NEW ARRIVALS',
  //       ctaHref: '/shop/new-arrivals',
  //       image:
  //         'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
  //     },
  //   ],
  // },
  {
    id: 'living',
    title: 'LIVING',
    href: '/shop/living-room',
    type: 'megamenu',
    columns: [
      {
        header: 'Sofas',
        items: [
          { title: 'Sectional Sofas', href: '/shop/living-room/sectional-sofas' },
          { title: 'Modular Sofas', href: '/shop/living-room/modular-sofas' },
          { title: 'Loveseats', href: '/shop/living-room/loveseats' },
          { title: 'Sofa Beds', href: '/shop/living-room/sofa-beds' },
          { title: 'Recliner Sofas', href: '/shop/living-room/recliner-sofas' },
        ],
      },
      {
        header: 'Chairs',
        items: [
          { title: 'Accent Chairs', href: '/shop/living-room/accent-chairs' },
          { title: 'Lounge Chairs', href: '/shop/living-room/lounge-chairs' },
          { title: 'Armchairs', href: '/shop/living-room/armchairs' },
          { title: 'Recliners', href: '/shop/living-room/recliners' },
          { title: 'Swivel Chairs', href: '/shop/living-room/swivel-chairs' },
        ],
      },
      {
        header: 'Tables',
        items: [
          { title: 'Coffee Tables', href: '/shop/living-room/coffee-tables' },
          { title: 'Side Tables', href: '/shop/living-room/side-tables' },
          { title: 'Console Tables', href: '/shop/living-room/console-tables' },
          { title: 'Nesting Tables', href: '/shop/living-room/nesting-tables' },
          { title: 'End Tables', href: '/shop/living-room/end-tables' },
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
        title: 'YOUR SOFA, YOUR CONFIGURATION',
        subtitle: 'Built for comfort, and always ready to adapt to the way you live.',
        ctaText: 'SHOP MODULAR SOFAS',
        ctaHref: '/shop/living-room/modular',
        image:
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
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
        items: [
          { title: 'Round Dining Tables', href: '/shop/dining-room/round-dining-tables' },
          {
            title: 'Rectangular Dining Tables',
            href: '/shop/dining-room/rectangular-dining-tables',
          },
          { title: 'Extendable Dining Tables', href: '/shop/dining-room/extendable-dining-tables' },
          { title: 'Counter Height Tables', href: '/shop/dining-room/counter-height-tables' },
        ],
      },
      {
        header: 'Dining Chairs',
        items: [
          { title: 'Upholstered Chairs', href: '/shop/dining-room/upholstered-chairs' },
          { title: 'Wooden Chairs', href: '/shop/dining-room/wooden-chairs' },
          { title: 'Arm Dining Chairs', href: '/shop/dining-room/arm-dining-chairs' },
          { title: 'Side Chairs', href: '/shop/dining-room/side-chairs' },
        ],
      },
      {
        header: 'Bar Furniture',
        items: [
          { title: 'Bar Stools', href: '/shop/dining-room/bar-stools' },
          { title: 'Bar Tables', href: '/shop/dining-room/bar-tables' },
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
        title: 'DINING CHAIRS FOR EVERY HOME',
        subtitle: 'Designed for spaces where good taste is always on the menu.',
        ctaText: 'SHOP DINING CHAIRS',
        ctaHref: '/shop/dining-room/dining-chairs',
        image:
          'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop',
      },
      {
        title: 'TRAVERTINE DINING TABLES',
        subtitle: 'A true centerpiece for gatherings, big moments, and everyday rituals alike.',
        ctaText: 'SHOP TRAVERTINE DINING TABLES',
        ctaHref: '/shop/dining-room/travertine',
        image:
          'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'storage-consoles',
    title: 'STORAGE & CONSOLES',
    href: '/shop/storage-consoles',
    type: 'megamenu',
    columns: [
      {
        header: 'Storage',
        items: [
          { title: 'TV Units', href: '/shop/storage/tv-units' },
          { title: 'Sideboards', href: '/shop/storage/sideboards' },
          { title: 'Cabinets', href: '/shop/storage/cabinets' },
          { title: 'Bookcases', href: '/shop/storage/bookcases' },
          { title: 'Shelving Units', href: '/shop/storage/shelving-units' },
          { title: 'Console Tables', href: '/shop/storage/console-tables' },
        ],
      },
    ],
    viewAllText: 'VIEW ALL STORAGE & CONSOLES',
    viewAllHref: '/shop/storage-consoles',
    promos: [
      {
        title: 'ORGANIZED LIVING SOLUTIONS',
        subtitle: 'Sleek consoles and sideboards designed to declutter with style.',
        ctaText: 'SHOP CONSOLES',
        ctaHref: '/shop/storage-consoles',
        image:
          'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'bedroom',
    title: 'BEDROOM',
    href: '/shop/bedroom',
    type: 'megamenu',
    columns: [
      {
        header: 'Beds',
        items: [
          { title: 'Platform Beds', href: '/shop/bedroom/platform-beds' },
          { title: 'Storage Beds', href: '/shop/bedroom/storage-beds' },
          { title: 'Upholstered Beds', href: '/shop/bedroom/upholstered-beds' },
          { title: 'Wooden Beds', href: '/shop/bedroom/wooden-beds' },
          { title: 'Canopy Beds', href: '/shop/bedroom/canopy-beds' },
        ],
      },
      {
        items: [
          { title: 'Nightstands', href: '/shop/bedroom/nightstands' },
          { title: 'Dressers', href: '/shop/bedroom/dressers' },
          { title: 'Wardrobes', href: '/shop/bedroom/wardrobes' },
          { title: 'Chest of Drawers', href: '/shop/bedroom/chest-of-drawers' },
          { title: 'Bedroom Benches', href: '/shop/bedroom/bedroom-benches' },
        ],
      },
    ],
    viewAllText: 'VIEW ALL BEDROOM',
    viewAllHref: '/shop/bedroom',
    promos: [
      {
        title: 'SERENE BEDROOM SANCTUARY',
        subtitle: 'Crafted for restful sleep and timeless aesthetic appeal.',
        ctaText: 'SHOP BEDROOM',
        ctaHref: '/shop/bedroom',
        image:
          'https://images.unsplash.com/photo-1540518614846-7ede433c5172?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'outdoor',
    title: 'OUTDOOR',
    href: '/shop/outdoor',
    type: 'dropdown',
    dropdownItems: [
      { title: 'Lounge Sets', href: '/shop/outdoor/lounge-sets' },
      { title: 'Outdoor Sofas', href: '/shop/outdoor/outdoor-sofas' },
      { title: 'Outdoor Chairs', href: '/shop/outdoor/outdoor-chairs' },
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
