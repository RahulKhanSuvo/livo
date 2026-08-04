export interface ShippingZone {
  id: string;
  name: string;
  regions: string;
  carriers: string;
  delivery: string;
  status: 'Active' | 'Draft';
}

export interface DeliveryFee {
  id: string;
  zone: string;
  method: string;
  threshold: string;
  fee: number;
  freeOver: number;
}

export interface TrackingRow {
  id: string;
  order: string;
  carrier: string;
  trackingNo: string;
  status: 'In transit' | 'Delivered' | 'Pending';
  eta: string;
}

export const shippingZones: ShippingZone[] = [
  { id: 'Z-01', name: 'Europe', regions: 'EU + UK (24 countries)', carriers: 'DHL · GLS', delivery: '3–5 days', status: 'Active' },
  { id: 'Z-02', name: 'North America', regions: 'USA · Canada', carriers: 'UPS · FedEx', delivery: '5–8 days', status: 'Active' },
  { id: 'Z-03', name: 'Nordics', regions: 'DK · SE · NO · FI', carriers: 'PostNord', delivery: '2–4 days', status: 'Active' },
  { id: 'Z-04', name: 'Middle East', regions: 'AE · SA · QA', carriers: 'Aramex', delivery: '6–10 days', status: 'Draft' },
];

export const deliveryFees: DeliveryFee[] = [
  { id: 'DF-01', zone: 'Nordics', method: 'Standard', threshold: '≤ 20 kg', fee: 19, freeOver: 800 },
  { id: 'DF-02', zone: 'Europe', method: 'Standard', threshold: '≤ 20 kg', fee: 29, freeOver: 800 },
  { id: 'DF-03', zone: 'North America', method: 'Standard', threshold: '≤ 20 kg', fee: 49, freeOver: 1200 },
  { id: 'DF-04', zone: 'Europe', method: 'Express', threshold: 'any', fee: 59, freeOver: 0 },
  { id: 'DF-05', zone: 'Nordics', method: 'White glove', threshold: 'any', fee: 79, freeOver: 0 },
];

export const tracking: TrackingRow[] = [
  { id: 'TR-01', order: '#LV-2838', carrier: 'DHL', trackingNo: 'DHL-9942-1837-1', status: 'In transit', eta: 'Aug 7, 2026' },
  { id: 'TR-02', order: '#LV-2839', carrier: 'GLS', trackingNo: 'GLS-5520-9911-4', status: 'In transit', eta: 'Aug 6, 2026' },
  { id: 'TR-03', order: '#LV-2837', carrier: 'PostNord', trackingNo: 'PN-3318-2209-7', status: 'Delivered', eta: 'Delivered Jul 31' },
  { id: 'TR-04', order: '#LV-2836', carrier: 'UPS', trackingNo: 'UPS-1Z889-003-22', status: 'Pending', eta: 'Aug 9, 2026' },
];