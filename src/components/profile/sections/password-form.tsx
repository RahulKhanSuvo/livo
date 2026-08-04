'use client';

import { useState, useTransition } from 'react';

import { Field, PasswordInput, FormFeedback } from './form-controls';
import { changePasswordAction, type ProfileResult } from '../profile-actions';

export function PasswordForm() {
  const [pending, startTransition] = useTransition();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<ProfileResult | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const result = await changePasswordAction({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage(result);
      if (result.success) {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    });
  };

  return (
    <form
      onSubmit={submit}
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

      <FormFeedback message={message} />

      <div className="mt-7 flex items-center justify-end">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center rounded-xl bg-[#4b6b56] px-6 text-sm font-medium text-[#f4f1e8] transition-all hover:bg-[#3d5747] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? 'Updating…' : 'Update password'}
        </button>
      </div>
    </form>
  );
}
