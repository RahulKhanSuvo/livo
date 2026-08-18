'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { LockPasswordIcon } from '@hugeicons/core-free-icons';
import {
  updateProfileAction,
  changePasswordAction,
  signOutAction,
} from '@/components/profile/profile-actions';
import { initials } from '@/components/profile/profile.data';

interface SettingsFormProps {
  name: string;
  email: string;
}

export function SettingsForm({ name, email }: SettingsFormProps) {
  const [profileName, setProfileName] = useState(name);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);

  async function onProfile(e: React.FormEvent) {
    e.preventDefault();
    setProfileMsg(null);
    setProfileErr(null);
    const result = await updateProfileAction({ name: profileName });
    if (result.success) setProfileMsg(result.message ?? 'Saved');
    else setProfileErr(result.error);
  }

  async function onPassword(e: React.FormEvent) {
    e.preventDefault();
    setPwMsg(null);
    setPwErr(null);
    const result = await changePasswordAction({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (result.success) {
      setPwMsg(result.message ?? 'Changed');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwErr(result.error);
    }
  }

  return (
    <div className="bg-white text-[#161512]">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#4b6b56]">
          Account settings
        </p>
        <h1 className="mt-4 text-5xl font-medium tracking-tight">Manage your profile</h1>
      </section>

      <section className="mx-auto max-w-4xl space-y-8 px-6 pb-24">
        <form onSubmit={onProfile} className="border border-neutral-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-[#161512] text-sm text-[#f4f1e8]">
              {initials(name)}
            </div>
            <div>
              <h2 className="text-sm font-medium">Profile details</h2>
              <p className="text-xs font-light text-neutral-500">Update your display name</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                Name
              </span>
              <input
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="mt-2 w-full rounded-none border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#4b6b56]"
              />
            </label>
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                Email
              </span>
              <input
                value={email}
                disabled
                className="mt-2 w-full cursor-not-allowed rounded-none border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500"
              />
            </label>
          </div>

          {profileMsg && <p className="mt-4 text-sm font-medium text-[#4b6b56]">{profileMsg}</p>}
          {profileErr && <p className="mt-4 text-sm font-medium text-red-600">{profileErr}</p>}

          <button
            type="submit"
            className="mt-6 rounded-full bg-[#161512] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#f4f1e8] transition-colors hover:bg-[#4b6b56]"
          >
            Save changes
          </button>
        </form>

        <form onSubmit={onPassword} className="border border-neutral-200 bg-white p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center bg-neutral-100">
              <HugeiconsIcon icon={LockPasswordIcon} size={20} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-sm font-medium">Change password</h2>
              <p className="text-xs font-light text-neutral-500">Use at least 8 characters</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4">
            <label className="block">
              <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                Current password
              </span>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 w-full rounded-none border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#4b6b56]"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  New password
                </span>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 w-full rounded-none border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#4b6b56]"
                />
              </label>
              <label className="block">
                <span className="text-[11px] font-medium uppercase tracking-wider text-neutral-600">
                  Confirm new password
                </span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 w-full rounded-none border border-neutral-300 px-4 py-3 text-sm outline-none transition-colors focus:border-[#4b6b56]"
                />
              </label>
            </div>
          </div>

          {pwMsg && <p className="mt-4 text-sm font-medium text-[#4b6b56]">{pwMsg}</p>}
          {pwErr && <p className="mt-4 text-sm font-medium text-red-600">{pwErr}</p>}

          <button
            type="submit"
            className="mt-6 rounded-full bg-[#161512] px-6 py-3 text-xs font-medium uppercase tracking-wider text-[#f4f1e8] transition-colors hover:bg-[#4b6b56]"
          >
            Update password
          </button>
        </form>

        <div className="border border-red-200 bg-red-50 p-6 sm:p-8">
          <h2 className="text-sm font-medium text-red-900">Sign out</h2>
          <p className="mt-1 text-xs font-light text-red-700">You can sign back in any time.</p>
          <form action={signOutAction}>
            <button
              type="submit"
              className="mt-4 rounded-full border border-red-300 px-6 py-3 text-xs font-medium uppercase tracking-wider text-red-700 transition-colors hover:bg-red-100"
            >
              Sign out
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
