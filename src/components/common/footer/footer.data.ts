export interface FooterLink {
  label: string;
  href: string;
}

export const footerCategories: FooterLink[] = [
  { label: 'Beds', href: '/shop/beds' },
  { label: 'Chairs', href: '/shop/chairs' },
  { label: 'Sofas', href: '/shop/sofas' },
  { label: 'Decor', href: '/shop/decor' },
  { label: 'Storage', href: '/shop/storage' },
  { label: 'Tables', href: '/shop/tables' },
];

export const footerServices: FooterLink[] = [
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const footerInformation: FooterLink[] = [
  { label: 'Return and Refunds', href: '/return-and-refunds' },
  { label: 'Legal Area', href: '/legal-area' },
];
