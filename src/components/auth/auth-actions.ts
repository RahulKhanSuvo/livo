'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema, type AuthResult } from './auth-schema';

export type SignInAction = (values: { email: string; password: string }) => Promise<AuthResult>;

export type SignUpAction = (values: {
  name: string;
  email: string;
  password: string;
}) => Promise<AuthResult>;

export async function signInAction(values: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const parsed = signInSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    await auth.api.signInEmail({
      body: { email: parsed.data.email, password: parsed.data.password },
      headers: await headers(),
    });
  } catch {
    return { success: false, error: 'Invalid email or password' };
  }

  redirect('/');
}

export async function signUpAction(values: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResult> {
  const parsed = signUpSchema.safeParse({
    ...values,
    confirmPassword: values.password,
  });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0]?.message ?? 'Invalid input' };
  }

  try {
    await auth.api.signUpEmail({
      body: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: await headers(),
    });
  } catch {
    return { success: false, error: 'Could not create your account' };
  }

  redirect('/');
}
