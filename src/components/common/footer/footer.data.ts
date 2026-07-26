export interface FooterLink {
  label: string;
  href: string;
}

export const footerCategories: FooterLink[] = [
  { label: 'Beds', href: '/collections/beds' },
  { label: 'Chairs', href: '/collections/chairs' },
  { label: 'Sofas', href: '/collections/sofas' },
  { label: 'Decor', href: '/collections/decor' },
  { label: 'Storage', href: '/collections/storage' },
  { label: 'Tables', href: '/collections/tables' },
  { label: 'Modern Luxury', href: '/collections/modern-luxury' },
];

export const footerServices: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'Theme feature', href: '/features' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const footerInformation: FooterLink[] = [
  { label: 'Return and Refunds', href: '/returns' },
  { label: 'Legal Area', href: '/legal' },
];
