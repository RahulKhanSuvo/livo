import type { CartItem } from '@/stores/cart-store';

export type CheckoutStep = 'shipping' | 'payment' | 'success';

export interface ShippingFormData {
  fullName: string;
  phone: string;
  email: string;
  country: string;
  division: string;
  district: string;
  area: string;
  postalCode: string;
  address: string;
  notes: string;
}

export interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  couponCode?: string;
}

export interface ShippingStepProps {
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  defaultValues: Partial<ShippingFormData>;
  onComplete: (data: {
    clientSecret: string;
    orderId: string;
    shippingData: ShippingFormData;
  }) => void;
}

export interface PaymentStepProps {
  clientSecret: string;
  shippingData: ShippingFormData;
  items: CartItem[];
  totalAmount: number;
  onBack: () => void;
  onSuccess: () => void;
}

export const DIVISIONS = [
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Rangpur',
  'Mymensingh',
] as const;
