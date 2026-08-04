export interface CustomerRow {
  id: string;
  name: string;
  email: string;
  segment: 'VIP' | 'Regular' | 'New';
  orders: number;
  spent: number;
  joined: string;
}

export const customers: CustomerRow[] = [
  { id: 'CU-501', name: 'Michael P.', email: 'michael.p@gmail.com', segment: 'VIP', orders: 14, spent: 12850, joined: 'Mar 2024' },
  { id: 'CU-502', name: 'Sarah F.', email: 'sarah.f@outlook.com', segment: 'VIP', orders: 11, spent: 9420, joined: 'Jun 2024' },
  { id: 'CU-503', name: 'Anna K.', email: 'anna.k@gmail.com', segment: 'Regular', orders: 8, spent: 6170, joined: 'Jan 2025' },
  { id: 'CU-504', name: 'Karolina W.', email: 'karolina.w@gmail.com', segment: 'Regular', orders: 5, spent: 3980, joined: 'May 2025' },
  { id: 'CU-505', name: 'Jonas R.', email: 'jonas.r@icloud.com', segment: 'New', orders: 1, spent: 1120, joined: 'Jul 2026' },
  { id: 'CU-506', name: 'Priya M.', email: 'priya.m@gmail.com', segment: 'VIP', orders: 12, spent: 10430, joined: 'Feb 2024' },
  { id: 'CU-507', name: 'Diego F.', email: 'diego.f@outlook.com', segment: 'New', orders: 2, spent: 940, joined: 'Jul 2026' },
  { id: 'CU-508', name: 'Emily S.', email: 'emily.s@icloud.com', segment: 'Regular', orders: 6, spent: 2840, joined: 'Sep 2025' },
];