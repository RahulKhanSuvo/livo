type MetricTrend = 'up' | 'down';

export const dashboardMetrics: {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: MetricTrend;
  hint: string;
}[] = [
  {
    id: 'revenue',
    label: 'Total Sell',
    value: '$128,430',
    delta: '+12.4%',
    trend: 'up',
    hint: 'vs last month',
  },
  {
    id: 'orders',
    label: 'Orders',
    value: '1,284',
    delta: '+8.1%',
    trend: 'up',
    hint: 'vs last month',
  },
  {
    id: 'customers',
    label: 'Customers',
    value: '3,042',
    delta: '+5.6%',
    trend: 'up',
    hint: 'vs last month',
  },
  {
    id: 'conversion',
    label: 'Conversion Rate',
    value: '3.2%',
    delta: '-0.4%',
    trend: 'down',
    hint: 'vs last month',
  },
];

export const salesSeries = [
  { label: 'Jan', value: 4200 },
  { label: 'Feb', value: 5100 },
  { label: 'Mar', value: 4700 },
  { label: 'Apr', value: 6400 },
  { label: 'May', value: 5800 },
  { label: 'Jun', value: 7200 },
  { label: 'Jul', value: 6900 },
  { label: 'Aug', value: 8100 },
  { label: 'Sep', value: 7600 },
  { label: 'Oct', value: 9200 },
  { label: 'Nov', value: 10400 },
  { label: 'Dec', value: 11800 },
];

export const categoryShare = [
  { label: 'Sofas', value: 38, color: '#4b6b56' },
  { label: 'Chairs', value: 26, color: '#d98e63' },
  { label: 'Tables', value: 18, color: '#a9b8a5' },
  { label: 'Lighting & Decor', value: 12, color: '#cbb9a5' },
  { label: 'Beds', value: 6, color: '#8a9b80' },
];

export const topProducts = [
  {
    id: 'P-1001',
    name: 'Mello Lounge Sofa',
    brand: 'SITS',
    sold: 184,
    revenue: 237360,
    delta: '+18%',
  },
  {
    id: 'P-1008',
    name: 'Beetle Dining Chair',
    brand: 'GUBI',
    sold: 156,
    revenue: 138840,
    delta: '+12%',
  },
  {
    id: 'P-1010',
    name: 'Eames Plastic Armchair',
    brand: 'VITRA',
    sold: 132,
    revenue: 100320,
    delta: '+9%',
  },
  {
    id: 'P-1006',
    name: 'Offset 3-Seater Sofa',
    brand: 'MENU',
    sold: 98,
    revenue: 161700,
    delta: '+6%',
  },
  {
    id: 'P-1007',
    name: 'Oslo Lounge Chair',
    brand: 'MUUTO',
    sold: 87,
    revenue: 97440,
    delta: '+4%',
  },
];

export const recentOrders = [
  {
    id: 'O-2841',
    orderNumber: '#LV-2841',
    customer: 'Michael P.',
    total: 1290,
    status: 'PENDING',
    date: 'Aug 4, 2026',
  },
  {
    id: 'O-2840',
    orderNumber: '#LV-2840',
    customer: 'Sarah F.',
    total: 3560,
    status: 'CONFIRMED',
    date: 'Aug 3, 2026',
  },
  {
    id: 'O-2839',
    orderNumber: '#LV-2839',
    customer: 'Karolina W.',
    total: 1520,
    status: 'PROCESSING',
    date: 'Aug 3, 2026',
  },
  {
    id: 'O-2838',
    orderNumber: '#LV-2838',
    customer: 'Anna K.',
    total: 2100,
    status: 'SHIPPED',
    date: 'Aug 2, 2026',
  },
  {
    id: 'O-2835',
    orderNumber: '#LV-2835',
    customer: 'Diego F.',
    total: 599,
    status: 'CANCELLED',
    date: 'Jul 29, 2026',
  },
];

export const lowStock = [
  { id: 'P-1002', name: 'Togo Fireside Chair', sku: 'TOGO-FIR-04', stock: 6, reorderPoint: 8 },
  { id: 'P-1004', name: 'Quilted Sectional Module', sku: 'HAY-QSM-11', stock: 9, reorderPoint: 10 },
  { id: 'P-1003', name: 'Colin - 3 Seater Sofa', sku: 'SITS-CLN-03', stock: 0, reorderPoint: 6 },
  { id: 'P-1009', name: 'About A Lounge Chair', sku: 'HAY-AAL-12', stock: 0, reorderPoint: 8 },
];

export const trafficSource = [
  { label: 'Organic', value: 46, color: '#4b6b56' },
  { label: 'Direct', value: 24, color: '#d98e63' },
  { label: 'Social', value: 18, color: '#a9b8a5' },
  { label: 'Referral', value: 12, color: '#cbb9a5' },
];
