import {
  Tag01Icon,
  DeliveryTruck02Icon,
  CustomerService01Icon,
  Award01Icon,
} from '@hugeicons/core-free-icons';

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: typeof Tag01Icon;
}

export const featuresBarData: FeatureItem[] = [
  {
    id: '1',
    title: 'Amazing Value Every Day',
    description: 'Items you love at prices that fit your budget.',
    icon: Tag01Icon,
  },
  {
    id: '2',
    title: 'Fast & Free Shipping',
    description: 'Two-day delivery on thousands of items.',
    icon: DeliveryTruck02Icon,
  },
  {
    id: '3',
    title: 'Expert Customer Service',
    description: 'Our friendly team’s on hand 24/7 a week.',
    icon: CustomerService01Icon,
  },
  {
    id: '4',
    title: 'Wonder Selection',
    description: 'All things home & garden in one place.',
    icon: Award01Icon,
  },
];
