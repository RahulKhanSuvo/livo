import type { AdminIcon } from '@/components/admin/ui/icon';
import {
  Analytics02Icon,
  BanknoteIcon,
  BloggerIcon,
  // BoxesIcon,
  ChartColumnIcon,
  ChartHistogramIcon,
  ChartLineIcon,
  // CheckmarkBadge01Icon,
  // Clock01Icon,
  ContentWritingIcon,
  Coupon01Icon,
  CreditCardIcon,
  DashboardSquare02Icon,
  // DeliveryReturn01Icon,
  DeliveryTracking01Icon,
  // DeliveryTruck01Icon,
  // Folder01Icon,
  FolderOpenIcon,
  GalleryHorizontalEndIcon,
  Globe02Icon,
  Image01Icon,
  Invoice02Icon,
  // PackageDelivered01Icon,
  // PackageIcon,
  // PackageProcessIcon,
  PieChart01Icon,
  Settings05Icon,
  ShipmentTrackingIcon,
  ShoppingBag01Icon,
  StarIcon,
  // Store03Icon,
  UserGroupIcon,
  UserShield01Icon,
} from '@hugeicons/core-free-icons';

export interface AdminNavItem {
  title: string;
  href: string;
  icon: AdminIcon;
  badge?: string;
  children?: AdminNavItem[];
}

export interface AdminNavGroup {
  label: string;
  items: AdminNavItem[];
}

export const adminNavGroups: AdminNavGroup[] = [
  {
    label: 'Overview',
    items: [{ title: 'Dashboard', href: '/admin', icon: DashboardSquare02Icon }],
  },
  {
    label: 'Commerce',
    items: [
      {
        title: 'Catalog',
        href: '/admin/catalog/products',
        icon: ShoppingBag01Icon,
        // children: [
        //   { title: 'Products', href: '/admin/catalog/products', icon: PackageIcon },
        //   { title: 'Categories', href: '/admin/catalog/categories', icon: Folder01Icon },
        //   { title: 'Brands', href: '/admin/catalog/brands', icon: Store03Icon },
        //   { title: 'Inventory', href: '/admin/catalog/inventory', icon: BoxesIcon },
        // ],
      },
      {
        title: 'Orders',
        href: '/admin/orders',
        icon: Invoice02Icon,
        badge: '12',
      },
      { title: 'Customers', href: '/admin/customers', icon: UserGroupIcon },
      {
        title: 'Promotions',
        href: '/admin/promotions/coupons',
        icon: Coupon01Icon,
      },
      { title: 'Reviews', href: '/admin/reviews', icon: StarIcon, badge: '8' },
    ],
  },
  {
    label: 'Insights',
    items: [
      {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: Analytics02Icon,
        children: [
          { title: 'Sales', href: '/admin/analytics#sales', icon: ChartLineIcon },
          { title: 'Products', href: '/admin/analytics#products', icon: ChartColumnIcon },
          { title: 'Customers', href: '/admin/analytics#customers', icon: ChartHistogramIcon },
          { title: 'Revenue', href: '/admin/analytics#revenue', icon: PieChart01Icon },
        ],
      },
    ],
  },
  {
    label: 'Manage',
    items: [
      {
        title: 'Content',
        href: '/admin/content/banners',
        icon: ContentWritingIcon,
        children: [
          { title: 'Homepage Banners', href: '/admin/content/banners', icon: Image01Icon },
          {
            title: 'Hero Slides',
            href: '/admin/content/hero-slides',
            icon: GalleryHorizontalEndIcon,
          },
          { title: 'Collections', href: '/admin/content/collections', icon: FolderOpenIcon },
          { title: 'Blog', href: '/admin/content/blog', icon: BloggerIcon },
        ],
      },
      {
        title: 'Shipping',
        href: '/admin/shipping/zones',
        icon: ShipmentTrackingIcon,
        children: [
          { title: 'Shipping Zones', href: '/admin/shipping/zones', icon: Globe02Icon },
          { title: 'Delivery Fees', href: '/admin/shipping/delivery-fees', icon: BanknoteIcon },
          { title: 'Tracking', href: '/admin/shipping/tracking', icon: DeliveryTracking01Icon },
        ],
      },
      { title: 'Payments', href: '/admin/payments', icon: CreditCardIcon },
      {
        title: 'Users',
        href: '/admin/users/admins',
        icon: UserGroupIcon,
        children: [{ title: 'Admins', href: '/admin/users/admins', icon: UserShield01Icon }],
      },
    ],
  },
  {
    label: 'System',
    items: [{ title: 'Settings', href: '/admin/settings', icon: Settings05Icon }],
  },
];

export function findActiveItem(pathname: string): AdminNavItem | null {
  for (const group of adminNavGroups) {
    for (const item of group.items) {
      if (pathname === item.href) return item;
      for (const child of item.children ?? []) {
        if (child.href.split('?')[0] === pathname) return child;
      }
    }
  }
  return null;
}
