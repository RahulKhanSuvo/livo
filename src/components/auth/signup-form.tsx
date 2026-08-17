'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { AuthField } from './auth-field';
import { signUpSchema } from './auth-schema';
import type { SignUpAction } from './auth-actions';

export function SignUpForm({ action }: { action: SignUpAction }) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
    validators: {
      onChange: ({ value }) => {
        const result = signUpSchema.safeParse(value);
        if (!result.success) {
          const issue = result.error.issues[0];
          if (issue && typeof issue.path[0] === 'string') {
            return { fields: { [issue.path[0]]: issue.message } };
          }
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      const result = await action({
        name: value.name,
        email: value.email,
        password: value.password,
      });
      if (result.success) {
        await authClient.getSession();
        router.push(result.redirectTo ?? '/');
        router.refresh();
      } else {
        setServerError(result.error);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
      noValidate
    >
      <div className="mb-8">
        <h2 className="font-serif text-4xl tracking-tight text-[#4c4a45]">Create your account</h2>
        <p className="mt-2 text-sm text-[#4c4a45]/55">
          Join Livo to save favourites and track orders.
        </p>
      </div>

      <form.Field
        name="name"
        children={(field) => (
          <AuthField field={field} label="Full name" placeholder="Jane Doe" autoComplete="name" />
        )}
      />

      <form.Field
        name="email"
        children={(field) => (
          <AuthField
            field={field}
            label="Email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
          />
        )}
      />

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="password"
          children={(field) => (
            <AuthField
              field={field}
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          )}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => (
            <AuthField
              field={field}
              label="Confirm"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          )}
        />
      </div>

      <p className="text-xs leading-relaxed text-[#4c4a45]/45">
        By creating an account you agree to Livo’s Terms of Service and Privacy Policy.
      </p>

      <form.Subscribe
        selector={(s) => s.isSubmitting}
        children={(isSubmitting) => (
          <div className="space-y-3">
            {serverError && (
              <p
                className="rounded-lg bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive"
                role="alert"
              >
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="group/btn h-12 w-full rounded-xl bg-[#4b6b56] font-medium text-[#f4f1e8] transition-all hover:bg-[#3d5747]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-[#f4f1e8]/40 border-t-[#f4f1e8]" />
                  Creating account…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create account
                  <HugeiconsIcon
                    icon={ArrowRight02Icon}
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </span>
              )}
            </Button>
          </div>
        )}
      />
    </form>
  );
}
