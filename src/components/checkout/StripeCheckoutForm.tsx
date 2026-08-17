'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function StripeCheckoutForm({
  clientSecret,
  onSuccess,
}: {
  clientSecret: string;
  onSuccess?: () => void;
}) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <PaymentForm clientSecret={clientSecret} onSuccess={onSuccess} />
    </Elements>
  );
}
