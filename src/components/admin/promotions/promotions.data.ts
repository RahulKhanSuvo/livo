export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'Percentage' | 'Fixed amount' | 'Free shipping';
  value: string;
  usage: number;
  used: number;
  expires: string;
  status: 'Active' | 'Expired' | 'Draft';
}

export interface Discount {
  id: string;
  name: string;
  kind: 'Bundle' | 'Flash sale' | 'Loyalty';
  value: string;
  products: string;
  ends: string;
  status: 'Active' | 'Upcoming' | 'Ended';
}

export interface GiftCard {
  id: string;
  code: string;
  recipient: string;
  initial: number;
  balance: number;
  issueDate: string;
  status: 'Active' | 'Redeemed' | 'Expired';
}

export const coupons: Coupon[] = [
  { id: 'CP-01', code: 'WELCOME15', description: '15% off first order', type: 'Percentage', value: '15%', usage: 400, used: 312, expires: 'Dec 31, 2026', status: 'Active' },
  { id: 'CP-02', code: 'SOFA50', description: '$50 off all sofas', type: 'Fixed amount', value: '$50', usage: 200, used: 147, expires: 'Oct 15, 2026', status: 'Active' },
  { id: 'CP-03', code: 'FREESHIP', description: 'Free shipping over $500', type: 'Free shipping', value: '—', usage: 600, used: 422, expires: 'Sep 30, 2026', status: 'Active' },
  { id: 'CP-04', code: 'SUMMER20', description: '20% off seasonal edit', type: 'Percentage', value: '20%', usage: 350, used: 350, expires: 'Jul 31, 2026', status: 'Expired' },
  { id: 'CP-05', code: 'VIP10', description: '10% off for VIP members', type: 'Percentage', value: '10%', usage: 150, used: 88, expires: 'Dec 31, 2026', status: 'Draft' },
];

export const discounts: Discount[] = [
  { id: 'D-01', name: 'Dining Room Bundle', kind: 'Bundle', value: '-12%', products: '8 products', ends: 'Sep 30, 2026', status: 'Active' },
  { id: 'D-02', name: 'Flash Sale — Lounge Chairs', kind: 'Flash sale', value: '-25%', products: '5 products', ends: 'Aug 10, 2026', status: 'Active' },
  { id: 'D-03', name: 'Member Weekend', kind: 'Loyalty', value: '-10%', products: 'All products', ends: 'Aug 18, 2026', status: 'Upcoming' },
  { id: 'D-04', name: 'Summer Clearance', kind: 'Flash sale', value: '-40%', products: '23 products', ends: 'Jul 31, 2026', status: 'Ended' },
];

export const giftCards: GiftCard[] = [
  { id: 'GC-001', code: 'LIVO-GC-A3F9', recipient: 'michael.p@gmail.com', initial: 250, balance: 250, issueDate: 'Aug 2, 2026', status: 'Active' },
  { id: 'GC-002', code: 'LIVO-GC-K2H1', recipient: 'anna.k@gmail.com', initial: 500, balance: 180, issueDate: 'Jul 20, 2026', status: 'Active' },
  { id: 'GC-003', code: 'LIVO-GC-M7T2', recipient: 'priya.m@gmail.com', initial: 150, balance: 0, issueDate: 'Jun 12, 2026', status: 'Redeemed' },
  { id: 'GC-004', code: 'LIVO-GC-Q4B8', recipient: 'sarah.f@outlook.com', initial: 1000, balance: 640, issueDate: 'May 30, 2026', status: 'Active' },
];