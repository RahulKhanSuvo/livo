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
  {
    id: 'new-arrivals',
    title: 'NEW ARRIVALS',
    href: '/shop/new-arrivals',
    type: 'megamenu',
    columns: [
      {
        header: 'New In Categories',
        items: [
          { title: 'New in Living Room', href: '/shop/new-arrivals/living' },
          { title: 'New in Dining Room', href: '/shop/new-arrivals/dining' },
          { title: 'New in Bedroom', href: '/shop/new-arrivals/bedroom' },
          { title: 'New Outdoor Releases', href: '/shop/new-arrivals/outdoor' },
        ],
      },
      {
        header: 'Featured Arrivals',
        items: [
          { title: 'Travertine Collection', href: '/shop/new-arrivals/travertine' },
          { title: 'Bouclé Sofas & Chairs', href: '/shop/new-arrivals/boucle' },
          { title: 'Solid Walnut Furniture', href: '/shop/new-arrivals/walnut' },
        ],
      },
    ],
    viewAllText: 'VIEW ALL NEW ARRIVALS',
    viewAllHref: '/shop/new-arrivals',
    promos: [
      {
        title: 'NEW SEASON COLLECTION',
        subtitle: 'Discover contemporary designs crafted for modern living.',
        ctaText: 'SHOP NEW ARRIVALS',
        ctaHref: '/shop/new-arrivals',
        image:
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'living',
    title: 'LIVING',
    href: '/shop/living-room',
    type: 'megamenu',
    columns: [
      {
        header: 'Sofas',
        items: [
          { title: 'Sectionals', href: '/shop/living-room/sectionals' },
          { title: 'Modular', href: '/shop/living-room/modular' },
          { title: 'Sofa Beds', href: '/shop/living-room/sofa-beds' },
          { title: 'Ottoman', href: '/shop/living-room/ottoman' },
          { title: 'Recliners', href: '/shop/living-room/recliners' },
        ],
      },
      {
        header: 'Sofas By Collection',
        items: [
          { title: 'Tristen', href: '/shop/living-room/collection/tristen' },
          { title: 'Hara', href: '/shop/living-room/collection/hara' },
          { title: 'Pelayo', href: '/shop/living-room/collection/pelayo' },
          { title: 'Richfield', href: '/shop/living-room/collection/richfield' },
          { title: 'Flot', href: '/shop/living-room/collection/flot' },
          { title: 'Maxwell', href: '/shop/living-room/collection/maxwell' },
        ],
      },
      {
        header: 'Tables',
        items: [
          { title: 'Coffee Tables', href: '/shop/living-room/coffee-tables' },
          { title: 'Side Tables', href: '/shop/living-room/side-tables' },
          { title: 'Travertine Tables', href: '/shop/living-room/travertine-tables' },
          { title: 'Marble Tables', href: '/shop/living-room/marble-tables' },
        ],
      },
      {
        header: 'Lounge Chairs',
        items: [],
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
        items: [
          { title: 'Dining Tables', href: '/shop/dining-room/dining-tables' },
          { title: 'Dining Chairs', href: '/shop/dining-room/dining-chairs' },
          { title: 'Benches', href: '/shop/dining-room/benches' },
          { title: 'Barstools', href: '/shop/dining-room/barstools' },
        ],
      },
      {
        header: 'By Collection',
        items: [
          { title: 'Thierry Dining', href: '/shop/dining-room/thierry' },
          { title: 'Edison Dining', href: '/shop/dining-room/edison' },
          { title: 'Natalie Dining', href: '/shop/dining-room/natalie' },
          { title: 'Luna Dining', href: '/shop/dining-room/luna' },
          { title: 'Walsh Dining', href: '/shop/dining-room/walsh' },
          { title: 'Natural Travertine Tables', href: '/shop/dining-room/travertine' },
          { title: 'Sintered Stone Tables', href: '/shop/dining-room/sintered-stone' },
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
          { title: 'TV Consoles', href: '/shop/storage/tv-consoles' },
          { title: 'Sideboards & Buffets', href: '/shop/storage/sideboards' },
          { title: 'Display Cabinets', href: '/shop/storage/display-cabinets' },
          { title: 'Dressers & Chests', href: '/shop/storage/dressers' },
        ],
      },
      {
        header: 'Consoles By Style',
        items: [
          { title: 'Modern Wood Consoles', href: '/shop/storage/wood-consoles' },
          { title: 'Sintered Stone Consoles', href: '/shop/storage/stone-consoles' },
          { title: 'Wall-Mounted Media Units', href: '/shop/storage/wall-mounted' },
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
        header: 'Bedroom Furniture',
        items: [
          { title: 'Beds & Frames', href: '/shop/bedroom/beds' },
          { title: 'Bedside Tables', href: '/shop/bedroom/bedside-tables' },
          { title: 'Dressers', href: '/shop/bedroom/dressers' },
          { title: 'Wardrobes', href: '/shop/bedroom/wardrobes' },
        ],
      },
      {
        header: 'Bed Collections',
        items: [
          { title: 'Upholstered Beds', href: '/shop/bedroom/upholstered-beds' },
          { title: 'Wooden Bed Frames', href: '/shop/bedroom/wooden-beds' },
          { title: 'Storage Beds', href: '/shop/bedroom/storage-beds' },
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
      { title: 'Outdoor Lounge Furniture', href: '/shop/outdoor/lounge' },
      { title: 'Outdoor Dining Furniture', href: '/shop/outdoor/dining' },
    ],
  },
  {
    id: 'accessories',
    title: 'ACCESSORIES',
    href: '/shop/accessories',
    type: 'dropdown',
    dropdownItems: [
      { title: 'Rugs & Runners', href: '/shop/accessories/rugs' },
      { title: 'Lighting & Lamps', href: '/shop/accessories/lighting' },
      { title: 'Pillows & Throws', href: '/shop/accessories/pillows-throws' },
      { title: 'Wall Decor & Mirrors', href: '/shop/accessories/decor-mirrors' },
    ],
  },
  {
    id: 'egift-cards',
    title: 'EGIFT CARDS',
    href: '/egift-cards',
    type: 'link',
  },
];
