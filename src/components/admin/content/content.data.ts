export interface ContentRow {
  id: string;
  title: string;
  placement: string;
  status: 'Published' | 'Draft' | 'Unpublished';
  updated: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  status: 'Published' | 'Draft';
}

export interface Collection {
  id: string;
  name: string;
  products: number;
  updated: string;
  status: 'Active' | 'Inactive';
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  category: string;
  views: string;
  status: 'Published' | 'Draft';
}

export const banners: ContentRow[] = [
  { id: 'BN-01', title: 'Your sofa, your configuration', placement: 'Homepage · Living promo', status: 'Published', updated: 'Aug 2, 2026' },
  { id: 'BN-02', title: 'New season collection', placement: 'Homepage hero CTA', status: 'Published', updated: 'Jul 28, 2026' },
  { id: 'BN-03', title: 'Travertine dining tables', placement: 'Dining room promo', status: 'Published', updated: 'Jul 21, 2026' },
  { id: 'BN-04', title: 'Organized living solutions', placement: 'Storage & consoles promo', status: 'Draft', updated: 'Jul 12, 2026' },
];

export const heroSlides: HeroSlide[] = [
  { id: 'HS-01', title: 'Art Of Style', subtitle: 'Design for modern living', image: 'main-banner-7', status: 'Published' },
  { id: 'HS-02', title: 'Urban Sophistication', subtitle: 'Crafted for contemporary homes', image: '5-1', status: 'Published' },
  { id: 'HS-03', title: 'Serene Bedroom Sanctuary', subtitle: '', image: '6-1', status: 'Draft' },
];

export const collections: Collection[] = [
  { id: 'COL-01', name: 'Pure Detail', products: 24, updated: 'Jul 30, 2026', status: 'Active' },
  { id: 'COL-02', name: 'Solid Form', products: 18, updated: 'Jul 22, 2026', status: 'Active' },
  { id: 'COL-03', name: 'Soft Light', products: 31, updated: 'Jul 15, 2026', status: 'Active' },
  { id: 'COL-04', name: 'Modern Luxury', products: 12, updated: 'Jun 28, 2026', status: 'Inactive' },
];

export const blogPosts: BlogPost[] = [
  { id: 'BG-01', title: 'How to style a bouclé sofa', author: 'Editorial Team', category: 'Guides', views: '8.4k', status: 'Published' },
  { id: 'BG-02', title: 'The wood guide: oak vs walnut', author: 'Ava Lindqvist', category: 'Materials', views: '5.1k', status: 'Published' },
  { id: 'BG-03', title: 'Lighting your living room like a pro', author: 'Nordic Studio', category: 'Lighting', views: '3.7k', status: 'Draft' },
];