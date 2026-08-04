'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { ViewIcon, ViewOffIcon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';
import { SignOutButton } from './profile-shell';
import {
  updateProfileAction,
  changePasswordAction,
  signOutAction,
  type ProfileResult,
} from './profile-actions';
import type { ProfileUser } from './profile-shell';

interface EditTabProps {
  user: ProfileUser;
}

export function EditTab({ user }: EditTabProps) {
  const router = useRouter();
  const [profilePending, startProfile] = useTransition();
  const [passwordPending, startPassword] = useTransition();

  const [name, setName] = useState(user.name);
  const [profileMsg, setProfileMsg] = useState<ProfileResult | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<ProfileResult | null>(null);

  const submitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    startProfile(async () => {
      const result = await updateProfileAction({ name });
      setProfileMsg(result);
      if (result.success) router.refresh();
    });
  };

  const submitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    startPassword(async () => {
      const result = await changePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setPasswordMsg(result);
      if (result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h2 className="font-serif text-3xl tracking-tight text-[#161512]">
          Profile details
          <span className="text-[#d98e63]">.</span>
        </h2>
        <p className="mt-2 text-sm text-[#4c4a45]/60">
          Keep your name and contact details current.
        </p>
      </div>

      {/* ── Profile card ─────────────────────────────────────────── */}
      <form
        onSubmit={submitProfile}
        className="rounded-2xl border border-[#161512]/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="space-y-5">
          <Field label="Full name">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Your name"
            />
          </Field>

          <Field label="Email">
            <div className="flex h-11 items-center rounded-xl border border-[#161512]/10 bg-[#f6f5f1] px-4 text-sm text-[#4c4a45]/60">
              {user.email}
            </div>
          </Field>
        </div>

        <Feedback message={profileMsg} />

        <div className="mt-7 flex items-center justify-end">
          <button
            type="submit"
            disabled={profilePending || name.trim() === user.name}
            className="inline-flex h-11 items-center rounded-xl bg-[#4b6b56] px-6 text-sm font-medium text-[#f4f1e8] transition-all hover:bg-[#3d5747] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {profilePending ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>

      {/* ── Password card ────────────────────────────────────────── */}
      <form
        onSubmit={submitPassword}
        className="rounded-2xl border border-[#161512]/10 bg-white p-6 shadow-sm sm:p-8"
      >
        <h3 className="font-serif text-2xl tracking-tight text-[#161512]">Change password</h3>
        <p className="mt-1 text-sm text-[#4c4a45]/60">
          Choose a strong password of at least 8 characters.
        </p>

        <div className="mt-6 space-y-5">
          <Field label="Current password">
            <PasswordInput
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="••••••••"
            />
          </Field>
          <Field label="New password">
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              placeholder="At least 8 characters"
            />
          </Field>
          <Field label="Confirm new password">
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Repeat new password"
            />
          </Field>
        </div>

        <Feedback message={passwordMsg} />

        <div className="mt-7 flex items-center justify-end">
          <button
            type="submit"
            disabled={passwordPending}
            className="inline-flex h-11 items-center rounded-xl bg-[#4b6b56] px-6 text-sm font-medium text-[#f4f1e8] transition-all hover:bg-[#3d5747] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {passwordPending ? 'Updating…' : 'Update password'}
          </button>
        </div>
      </form>

      {/* ── Sign out ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#161512]/10 bg-white/60 p-6">
        <p className="text-sm text-[#4c4a45]/60">
          Sign out of this device. You can sign back in anytime.
        </p>
        <SignOutButton action={signOutAction} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-medium tracking-[0.15em] text-[#4c4a45]/55 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'h-11 w-full rounded-xl border border-[#161512]/10 bg-white px-4 text-sm text-[#161512]', //
        'placeholder:text-[#4c4a45]/35 focus:border-[#4b6b56] focus:outline-none focus:ring-2 focus:ring-[#4b6b56]/20',
        props.className
      )}
    />
  );
}

function PasswordInput({
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

function Feedback({ message }: { message: ProfileResult | null }) {
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
