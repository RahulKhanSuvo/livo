'use client';

import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useProductForm } from './use-product-form';
import { StepDots } from './step-dots';
import { STEPS } from './types';
import { IdentityStep } from './steps/identity-step';
import { ClassificationStep } from './steps/classification-step';
import { VariantsStep } from './steps/variants-step';

export function AddProductDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { form, step, serverMessage, handleNext, goBack } = useProductForm();

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onOpenChange(false);
      }}
    >
      <DialogContent className="gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="gap-2 border-b px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-xl">Add product</DialogTitle>
              <DialogDescription className="mt-1">
                Step {step + 1} of {STEPS.length} · {STEPS[step]}
              </DialogDescription>
            </div>
            <span className="shrink-0 text-xs font-medium text-muted-foreground">
              {step + 1}/{STEPS.length}
            </span>
          </div>
          <StepDots step={step} count={STEPS.length} />
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          noValidate
        >
          <div className="max-h-[calc(100vh-20rem)] overflow-y-auto px-6 py-6">
            {step === 0 && <IdentityStep form={form} />}
            {step === 1 && <ClassificationStep form={form} />}
            {step === 2 && <VariantsStep form={form} />}

            {serverMessage && (
              <div
                className={cn(
                  'mt-5 rounded-xl px-4 py-3 text-sm ring-1',
                  serverMessage.tone === 'error'
                    ? 'bg-destructive/8 text-destructive ring-destructive/20'
                    : 'bg-[#4b6b56]/8 text-[#4b6b56] ring-[#4b6b56]/15'
                )}
              >
                {serverMessage.text}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-t px-6 py-4">
            {step > 0 ? (
              <Button type="button" variant="ghost" onClick={goBack}>
                <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                Back
              </Button>
            ) : (
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
            )}

            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={() => void handleNext()}>
                Continue
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
              </Button>
            ) : (
              <Button type="submit" className="gap-1.5">
                Create product
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
