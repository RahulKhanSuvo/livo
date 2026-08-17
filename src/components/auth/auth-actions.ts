'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { signInSchema, type AuthResult } from './auth-schema';

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
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Invalid input',
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
      },
      headers: await headers(), // 👈 important
    });

    return {
      success: true,
      redirectTo: '/profile',
    };
  } catch (error) {
    console.error('Sign in error:', error);

    return {
      success: false,
      error: 'Invalid email or password',
    };
  }
}
