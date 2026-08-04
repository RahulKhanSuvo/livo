import type { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';

export interface ProfileOrderItem {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  quantity: number;
  unitPrice: number;
}

export interface ProfileOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  createdAt: string;
  itemCount: number;
  items: ProfileOrderItem[];
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: 'Payment pending',
  PAID: 'Paid',
  FAILED: 'Payment failed',
  REFUNDED: 'Refunded',
};

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function initials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
