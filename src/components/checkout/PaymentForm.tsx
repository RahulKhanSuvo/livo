'use client';

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Loading02Icon, LockIcon, AlertCircleIcon } from '@hugeicons/core-free-icons';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PaymentFormProps {
  clientSecret: string;
  onSuccess?: () => void;
}

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '13px',
      color: '#09090b',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': {
        color: '#a1a1aa',
      },
    },
    invalid: {
      color: '#ef4444',
    },
  },
};

export function PaymentForm({ clientSecret, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError('Card element not initialized.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
        },
      });

      if (stripeError) {
        setError(stripeError.message ?? 'Payment failed');
        setLoading(false);
      } else if (
        paymentIntent &&
        (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')
      ) {
        setLoading(false);
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setLoading(false);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected payment error occurred.';
      setError(message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card Number */}
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-foreground">Card Number</Label>
        <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-xs focus-within:ring-1 focus-within:ring-ring">
          <CardNumberElement options={ELEMENT_OPTIONS} className="w-full" />
        </div>
      </div>

      {/* Expiration Date & CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-foreground">Expiration Date</Label>
          <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-xs focus-within:ring-1 focus-within:ring-ring">
            <CardExpiryElement options={ELEMENT_OPTIONS} className="w-full" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs font-medium text-foreground">CVC</Label>
          <div className="relative flex h-10 w-full items-center rounded-md border border-input bg-background px-3 py-2 text-xs focus-within:ring-1 focus-within:ring-ring">
            <CardCvcElement options={ELEMENT_OPTIONS} className="w-full" />
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive">
          <HugeiconsIcon icon={AlertCircleIcon} size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full h-11 text-xs font-semibold gap-2 shadow-sm mt-2"
      >
        {loading ? (
          <>
            <HugeiconsIcon icon={Loading02Icon} className="animate-spin" size={16} />
            Processing Payment...
          </>
        ) : (
          <>
            <HugeiconsIcon icon={LockIcon} size={16} />
            Pay Now Securely
          </>
        )}
      </Button>
    </form>
  );
}
