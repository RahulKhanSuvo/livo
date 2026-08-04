export interface PaymentMethodRow {
  id: string;
  provider: string;
  type: string;
  fee: string;
  enabled: boolean;
}

export interface TransactionRow {
  id: string;
  order: string;
  customer: string;
  method: string;
  amount: number;
  date: string;
  status: 'Paid' | 'Pending' | 'Refunded' | 'Failed';
}

export const paymentMethods: PaymentMethodRow[] = [
  { id: 'PM-01', provider: 'Visa', type: 'Card', fee: '1.9% + $0.30', enabled: true },
  { id: 'PM-02', provider: 'Mastercard', type: 'Card', fee: '1.9% + $0.30', enabled: true },
  { id: 'PM-03', provider: 'American Express', type: 'Card', fee: '2.6% + $0.30', enabled: true },
  { id: 'PM-04', provider: 'PayPal', type: 'Wallet', fee: '2.9% + $0.30', enabled: true },
  { id: 'PM-05', provider: 'Diners Club', type: 'Card', fee: '2.4% + $0.30', enabled: false },
  { id: 'PM-06', provider: 'Discover', type: 'Card', fee: '2.1% + $0.30', enabled: false },
];

export const transactions: TransactionRow[] = [
  { id: 'TX-881', order: '#LV-2840', customer: 'Sarah F.', method: 'Visa ···· 4412', amount: 3560, date: 'Aug 3, 2026', status: 'Paid' },
  { id: 'TX-880', order: '#LV-2839', customer: 'Karolina W.', method: 'PayPal', amount: 1520, date: 'Aug 3, 2026', status: 'Paid' },
  { id: 'TX-879', order: '#LV-2838', customer: 'Anna K.', method: 'Mastercard ···· 8830', amount: 2100, date: 'Aug 2, 2026', status: 'Paid' },
  { id: 'TX-878', order: '#LV-2835', customer: 'Diego F.', method: 'Amex ···· 2010', amount: -599, date: 'Jul 29, 2026', status: 'Refunded' },
  { id: 'TX-877', order: '#LV-2831', customer: 'Noah W.', method: 'Visa ···· 1024', amount: 1450, date: 'Jul 25, 2026', status: 'Failed' },
];