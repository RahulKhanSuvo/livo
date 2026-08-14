'use client';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';

import { createProductAction } from '@/app/(admin)/admin/catalog/products/actions';
import { emptyForm, STEPS, type FormValues } from './types';

export type ProductForm = ReturnType<typeof useProductForm>['form'];
export type ServerMessage = { tone: 'success' | 'error'; text: string } | null;

export function useProductForm({
  onSubmit,
}: { onSubmit?: (values: FormValues) => Promise<void> | void } = {}) {
  const [step, setStep] = useState(0);
  const [serverMessage, setServerMessage] = useState<ServerMessage>(null);

  const form = useForm({
    defaultValues: emptyForm,
    onSubmit: async ({ value }) => {
      setServerMessage(null);
      if (onSubmit) {
        await onSubmit(value);
        return;
      }
      const result = await createProductAction({
        name: value.name,
        brand: value.brand || undefined,
        material: value.material || undefined,
        description: value.description || undefined,
        category: value.categoryName,
        subcategory: value.subcategoryName,
        productType: value.productTypeName,
        variants: value.variants.map((v) => ({
          color: v.color || undefined,
          sku: v.sku,
          price: Number(v.price),
          salePrice: v.salePrice ? Number(v.salePrice) : undefined,
          stock: Number(v.stock),
        })),
      });

      if (!result.success) {
        setServerMessage({ tone: 'error', text: result.error });
        return;
      }
      setServerMessage({ tone: 'success', text: 'Product created successfully.' });
      form.reset();
      setStep(0);
    },
  });

  async function handleNext() {
    const required: Array<keyof FormValues> =
      step === 0
        ? ['name']
        : step === 1
          ? ['categoryName', 'subcategoryName', 'productTypeName']
          : [];

    for (const field of required) {
      const errors = await form.validateField(field, 'submit');
      if (errors.length) return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  return {
    form,
    step,
    serverMessage,
    handleNext,
    goBack: () => setStep((s) => Math.max(s - 1, 0)),
  };
}
