'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Location01Icon,
  UserIcon,
  CallIcon,
  MailIcon,
  AlertCircleIcon,
  Loading02Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createPaymentIntent } from '@/actions/checkout/checkout';
import type { ShippingStepProps } from './checkout-types';
import { DIVISIONS } from './checkout-types';

export function ShippingStep({ items, totalAmount, defaultValues, onComplete }: ShippingStepProps) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      fullName: defaultValues.fullName ?? '',
      phone: defaultValues.phone ?? '',
      email: defaultValues.email ?? '',
      country: defaultValues.country ?? 'Bangladesh',
      division: defaultValues.division ?? 'Dhaka',
      district: defaultValues.district ?? '',
      area: defaultValues.area ?? '',
      postalCode: defaultValues.postalCode ?? '',
      address: defaultValues.address ?? '',
      notes: defaultValues.notes ?? '',
    },
    onSubmit: async ({ value }) => {
      setErrorMsg(null);
      setIsSubmitting(true);

      // Client-side required field validation
      if (
        !value.fullName.trim() ||
        !value.phone.trim() ||
        !value.country.trim() ||
        !value.division.trim() ||
        !value.district.trim() ||
        !value.area.trim() ||
        !value.address.trim()
      ) {
        setErrorMsg('Please complete all required shipping fields (*).');
        setIsSubmitting(false);
        return;
      }

      try {
        const res = await createPaymentIntent({
          items: items.map((i) => ({
            productId: i.productId,
            variantId: i.variantId,
            quantity: i.quantity,
          })),
          shipping: {
            fullName: value.fullName.trim(),
            phone: value.phone.trim(),
            email: value.email.trim() || undefined,
            country: value.country.trim(),
            division: value.division.trim(),
            district: value.district.trim(),
            area: value.area.trim(),
            postalCode: value.postalCode.trim() || undefined,
            address: value.address.trim(),
            notes: value.notes.trim() || undefined,
          },
        });

        if (!res.success) {
          setErrorMsg(res.error || 'Failed to initialize checkout.');
          setIsSubmitting(false);
          return;
        }

        if (res.clientSecret && res.orderId) {
          onComplete({
            clientSecret: res.clientSecret,
            orderId: res.orderId,
            shippingData: value,
          });
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
        setErrorMsg(message);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="space-y-5">
      {/* Step Indicator */}
      <div className="flex items-center gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            1
          </span>
          <span className="font-semibold text-foreground">Shipping</span>
        </div>
        <div className="h-px flex-1 bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="flex size-5 items-center justify-center rounded-full bg-muted text-[10px] font-medium text-muted-foreground">
            2
          </span>
          <span className="text-muted-foreground">Payment</span>
        </div>
      </div>

      {/* Error Banner */}
      {errorMsg && (
        <div className="flex items-start gap-2.5 rounded-xl border border-destructive/20 bg-destructive/10 p-3.5 text-xs text-destructive">
          <HugeiconsIcon icon={AlertCircleIcon} size={18} className="shrink-0 mt-0.5" />
          <p className="leading-relaxed">{errorMsg}</p>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Section Header */}
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground font-heading">
          <HugeiconsIcon icon={Location01Icon} size={16} className="text-primary" />
          <span>Shipping Information</span>
        </div>

        <div className="space-y-3">
          {/* Full Name */}
          <form.Field name="fullName">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="fullName" className="text-xs font-medium">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="fullName"
                    name="fullName"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Recipient's Name"
                    required
                    className="h-9 pl-9 text-xs"
                  />
                  <HugeiconsIcon
                    icon={UserIcon}
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Phone */}
          <form.Field name="phone">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs font-medium">
                  Phone Number <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="e.g. +880 1700 000000"
                    required
                    className="h-9 pl-9 text-xs"
                  />
                  <HugeiconsIcon
                    icon={CallIcon}
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="email" className="text-xs font-medium">
                  Email Address <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="your.email@example.com"
                    className="h-9 pl-9 text-xs"
                  />
                  <HugeiconsIcon
                    icon={MailIcon}
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  />
                </div>
              </div>
            )}
          </form.Field>

          {/* Country & Division */}
          <div className="grid grid-cols-2 gap-2">
            <form.Field name="country">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor="country" className="text-xs font-medium">
                    Country <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    required
                    className="h-9 text-xs"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="division">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor="division" className="text-xs font-medium">
                    Division <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="division"
                    name="division"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    required
                    className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    {DIVISIONS.map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </form.Field>
          </div>

          {/* District & Area */}
          <div className="grid grid-cols-2 gap-2">
            <form.Field name="district">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor="district" className="text-xs font-medium">
                    District <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="district"
                    name="district"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="City/District"
                    required
                    className="h-9 text-xs"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="area">
              {(field) => (
                <div className="space-y-1">
                  <Label htmlFor="area" className="text-xs font-medium">
                    Area <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="area"
                    name="area"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder="Thana/Area"
                    required
                    className="h-9 text-xs"
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Postal Code */}
          <form.Field name="postalCode">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="postalCode" className="text-xs font-medium">
                  Postal Code <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="e.g. 1212"
                  className="h-9 text-xs"
                />
              </div>
            )}
          </form.Field>

          {/* Street Address */}
          <form.Field name="address">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="address" className="text-xs font-medium">
                  Street Address <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="House/Apartment #, Road #, Area"
                  required
                  rows={2}
                  className="text-xs resize-none"
                />
              </div>
            )}
          </form.Field>

          {/* Notes */}
          <form.Field name="notes">
            {(field) => (
              <div className="space-y-1">
                <Label htmlFor="notes" className="text-xs font-medium">
                  Delivery Notes <span className="text-muted-foreground">(Optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Special instructions for delivery driver..."
                  rows={2}
                  className="text-xs resize-none"
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Total + Submit */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div className="text-xs text-muted-foreground">
            Total:{' '}
            <span className="font-bold text-foreground text-sm">
              {totalAmount.toLocaleString('en-BD')} BDT
            </span>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-10 px-6 text-xs font-semibold gap-2"
          >
            {isSubmitting ? (
              <>
                <HugeiconsIcon icon={Loading02Icon} className="animate-spin" size={16} />
                Processing...
              </>
            ) : (
              <>
                Continue to Payment
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
