'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Field, Input, FormFeedback } from './form-controls';
import { updateProfileAction, type ProfileResult } from '../profile-actions';
import type { ProfileUser } from '../profile.data';

export function ProfileDetailsForm({ user }: { user: ProfileUser }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState(user.name);
  const [message, setMessage] = useState<ProfileResult | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const result = await updateProfileAction({ name });
      setMessage(result);
      if (result.success) router.refresh();
    });
  };

  return (
    <form
      onSubmit={submit}
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

      <FormFeedback message={message} />

      <div className="mt-7 flex items-center justify-end">
        <button
          type="submit"
          disabled={pending || name.trim() === user.name}
          className="inline-flex h-11 items-center rounded-xl bg-[#4b6b56] px-6 text-sm font-medium text-[#f4f1e8] transition-all hover:bg-[#3d5747] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {pending ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
