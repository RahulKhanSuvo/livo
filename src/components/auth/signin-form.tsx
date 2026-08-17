'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from '@tanstack/react-form';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { AuthField } from './auth-field';
import { signInSchema } from './auth-schema';

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const form = useForm({
    defaultValues: { email: '', password: '' },
    validators: {
      onChange: ({ value }) => {
        const result = signInSchema.safeParse(value);
        if (!result.success) {
          const issue = result.error.issues[0];
          if (issue) return { fields: { [issue.path[0]]: issue.message } };
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.push('/profile');
            router.refresh();
          },
          onError: (ctx) => {
            setServerError(ctx.error.message ?? 'Invalid email or password');
          },
        }
      );
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
        <h2 className="font-serif text-4xl tracking-tight text-[#4c4a45]">Welcome back</h2>
        <p className="mt-2 text-sm text-[#4c4a45]/55">Sign in to continue your design journey.</p>
      </div>

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

      <form.Field
        name="password"
        children={(field) => (
          <AuthField
            field={field}
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
          />
        )}
      />

      <div className="flex items-center justify-between pt-1">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[#4c4a45]/60">
          <input type="checkbox" className="size-4 accent-[#4b6b56]" />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-[#4b6b56] hover:underline">
          Forgot password?
        </a>
      </div>

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
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in
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
