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

  const demoCredentials = {
    admin: { email: 'admin@livo.com', password: 'Admin@123456' },
    user: { email: 'test@gmail.com', password: 'Pa$$w0rd!' },
  } as const;

  const fillCredentials = (role: keyof typeof demoCredentials) => {
    const creds = demoCredentials[role];
    form.setFieldValue('email', creds.email);
    form.setFieldValue('password', creds.password);
  };

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
        <h2 className="text-4xl tracking-tight text-primary">Welcome back</h2>
        <p className="mt-2 text-sm text-primary/55">Sign in to continue your design journey.</p>
      </div>

      {/* Quick demo login — fills credentials, does not submit */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => fillCredentials('admin')}
        >
          Login as Admin
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => fillCredentials('user')}
        >
          Login as User
        </Button>
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
        <label className="flex cursor-pointer items-center gap-2 text-sm text-primary/60">
          <input type="checkbox" className="size-4 accent-primary" />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          Forgot password?
        </a>
      </div>

      <form.Subscribe
        selector={(s) => s.isSubmitting}
        children={(isSubmitting) => (
          <div className="space-y-3">
            {serverError && (
              <p
                className="rounded-sm bg-destructive/10 px-3 py-2.5 text-sm font-medium text-destructive"
                role="alert"
              >
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="group/btn h-12 w-full rounded-sm bg-primary font-medium text-primary-foreground transition-all hover:bg-[#3d5747]"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
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
