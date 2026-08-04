'use client';

import { ProfileDetailsForm } from './profile-details-form';
import { PasswordForm } from './password-form';
import { SignOutButton } from './sign-out-button';
import { signOutAction } from '../profile-actions';
import type { ProfileUser } from '../profile.data';

export function EditSection({ user }: { user: ProfileUser }) {
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

      <ProfileDetailsForm user={user} />

      <PasswordForm />

      <div className="flex flex-col items-start gap-3 rounded-2xl border border-[#161512]/10 bg-white/60 p-6">
        <p className="text-sm text-[#4c4a45]/60">
          Sign out of this device. You can sign back in anytime.
        </p>
        <SignOutButton action={signOutAction} />
      </div>
    </div>
  );
}
