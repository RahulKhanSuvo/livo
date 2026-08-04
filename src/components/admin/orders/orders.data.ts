export type OrderRowStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED';

export type OrderPaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';

export interface OrderRow {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  items: string;
  total: number;
  status: OrderRowStatus;
  paymentStatus: OrderPaymentStatus;
  date: string;
}

export const orders: OrderRow[] = [
  { id: 'O-2841', orderNumber: '#LV-2841', customer: 'Michael P.', email: 'michael.p@gmail.com', items: 'Mello Lounge Sofa ×1', total: 1290, status: 'PENDING', paymentStatus: 'PENDING', date: 'Aug 4, 2026' },
  { id: 'O-2840', orderNumber: '#LV-2840', customer: 'Sarah F.', email: 'sarah.f@outlook.com', items: 'Beetle Dining Chair ×4', total: 3560, status: 'CONFIRMED', paymentStatus: 'PAID', date: 'Aug 3, 2026' },
  { id: 'O-2839', orderNumber: '#LV-2839', customer: 'Karolina W.', email: 'karolina.w@gmail.com', items: 'Eames Plastic Armchair ×2', total: 1520, status: 'PROCESSING', paymentStatus: 'PAID', date: 'Aug 3, 2026' },
  { id: 'O-2838', orderNumber: '#LV-2838', customer: 'Anna K.', email: 'anna.k@gmail.com', items: 'Rico Curved Sofa ×1', total: 2100, status: 'SHIPPED', paymentStatus: 'PAID', date: 'Aug 2, 2026' },
  { id: 'O-2837', orderNumber: '#LV-2837', customer: 'Jonas R.', email: 'jonas.r@icloud.com', items: 'Oslo Lounge Chair ×1', total: 1120, status: 'DELIVERED', paymentStatus: 'PAID', date: 'Jul 31, 2026' },
  { id: 'O-2836', orderNumber: '#LV-2836', customer: 'Priya M.', email: 'priya.m@gmail.com', items: 'Offset 3-Seater Sofa ×1', total: 1650, status: 'SHIPPED', paymentStatus: 'PAID', date: 'Jul 30, 2026' },
  { id: 'O-2835', orderNumber: '#LV-2835', customer: 'Diego F.', email: 'diego.f@outlook.com', items: 'Bit Table ×1', total: 599, status: 'CANCELLED', paymentStatus: 'REFUNDED', date: 'Jul 29, 2026' },
  { id: 'O-2834', orderNumber: '#LV-2834', customer: 'Hannah L.', email: 'hannah.l@gmail.com', items: 'Quilted Sectional Module ×1', total: 1850, status: 'PROCESSING', paymentStatus: 'PAID', date: 'Jul 28, 2026' },
  { id: 'O-2833', orderNumber: '#LV-2833', customer: 'Tom B.', email: 'tom.b@gmail.com', items: 'Togo Fireside Chair ×1', total: 980, status: 'PENDING', paymentStatus: 'PENDING', date: 'Jul 27, 2026' },
  { id: 'O-2832', orderNumber: '#LV-2832', customer: 'Emily S.', email: 'emily.s@icloud.com', items: 'Round Wall Mirror ×1', total: 350, status: 'DELIVERED', paymentStatus: 'PAID', date: 'Jul 26, 2026' },
  { id: 'O-2831', orderNumber: '#LV-2831', customer: 'Noah W.', email: 'noah.w@gmail.com', items: 'About A Lounge Chair ×1', total: 1450, status: 'CONFIRMED', paymentStatus: 'FAILED', date: 'Jul 25, 2026' },
  { id: 'O-2830', orderNumber: '#LV-2830', customer: 'Aya T.', email: 'aya.t@gmail.com', items: 'Mello Lounge Sofa ×1', total: 1290, status: 'DELIVERED', paymentStatus: 'PAID', date: 'Jul 24, 2026' },
];

export const orderSteps = [
  { id: 'PENDING', label: 'Pending' },
  { id: 'CONFIRMED', label: 'Confirmed' },
  { id: 'PROCESSING', label: 'Processing' },
  { id: 'SHIPPED', label: 'Shipped' },
  { id: 'DELIVERED', label: 'Delivered' },
] as const;

export function countOrdersByStatus(list: OrderRow[]) {
  const counts: Record<string, number> = { ALL: list.length };
  for (const o of list) counts[o.status] = (counts[o.status] ?? 0) + 1;
  return counts;
}