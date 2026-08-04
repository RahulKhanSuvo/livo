'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffIcon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import type { ProfileResult } from '../profile-actions';

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-medium tracking-[0.15em] text-[#4c4a45]/55 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 w-full rounded-xl border border-[#161512]/10 bg-white px-4 text-sm text-[#161512]',
        'placeholder:text-[#4c4a45]/35 focus:border-[#4b6b56] focus:outline-none focus:ring-2 focus:ring-[#4b6b56]/20',
        props.className
      )}
    />
  );
}

export function PasswordInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pr-11"
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#4c4a45]/45 transition-colors hover:text-[#4c4a45]"
      >
        <HugeiconsIcon icon={show ? ViewOffIcon : ViewIcon} size={18} strokeWidth={1.8} />
      </button>
    </div>
  );
}

export function FormFeedback({ message }: { message: ProfileResult | null }) {
  if (!message) return null;

  if (message.success) {
    return (
      <p className="mt-5 flex items-center gap-2 rounded-xl bg-[#4b6b56]/10 px-4 py-2.5 text-sm font-medium text-[#35503e]">
        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2} />
        {message.message ?? 'Saved'}
      </p>
    );
  }

  return (
    <p
      role="alert"
      className="mt-5 rounded-xl bg-[#8c3a2e]/10 px-4 py-2.5 text-sm font-medium text-[#8c3a2e]"
    >
      {message.error}
    </p>
  );
}
