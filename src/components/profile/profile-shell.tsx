'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Logout01Icon, PackageOpenIcon, UserAccountIcon } from '@hugeicons/core-free-icons';

import { Container } from '@/components/shared/Container';
import { cn } from '@/lib/utils';
import { initials } from './profile.data';
import { OrdersTab } from './orders-tab';
import { EditTab } from './edit-tab';
import type { ProfileOrder } from './profile.data';

export interface ProfileUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface ProfileShellProps {
  user: ProfileUser;
  orders: ProfileOrder[];
}

const ease = [0.16, 1, 0.3, 1] as const;

type Tab = 'orders' | 'profile';

export function ProfileShell({ user, orders }: ProfileShellProps) {
  const [tab, setTab] = useState<Tab>('orders');
  const first = user.name.split(' ')[0];

  return (
    <div className="bg-[#f6f5f1]">
      {/* ── Welcome band ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#161512]/10">
        <div aria-hidden className="bg-grain absolute inset-0 opacity-60" />
        <Container className="relative py-14 sm:py-20">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-5">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.4em] text-[#4b6b56] uppercase">
                <span className="inline-block size-1.5 rounded-full bg-[#d98e63]" />
                Livo Studio — Member area
              </p>

              <h1 className="font-serif text-5xl tracking-tight text-[#161512] sm:text-6xl">
                Welcome, {first}
                <span className="text-[#d98e63]">.</span>
              </h1>

              <p className="max-w-md text-sm leading-relaxed text-[#4c4a45]/70">
                A considered home is never finished. Follow your orders and keep your details in
                order.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-full bg-[#161512] font-serif text-xl text-[#f4f1e8]">
                {initials(user.name)}
              </div>
              <div className="space-y-0.5">
                <p className="font-medium text-[#161512]">{user.name}</p>
                <p className="text-sm text-[#4c4a45]/55">{user.email}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tabs + content ───────────────────────────────────────── */}
      <Container className="py-12 sm:py-16">
        <div
          role="tablist"
          aria-label="Profile sections"
          className="relative mb-12 flex w-full max-w-sm rounded-full border border-[#161512]/10 bg-white p-1.5 shadow-sm"
        >
          {(
            [
              { id: 'orders', label: 'Orders', icon: PackageOpenIcon },
              { id: 'profile', label: 'Profile', icon: UserAccountIcon },
            ] as const
          ).map(({ id, label, icon }) => {
            const active = tab === id;
            return (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={active}
                onClick={() => setTab(id)}
                className={cn(
                  'relative z-10 flex h-10 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200',
                  active ? 'text-[#f4f1e8]' : 'text-[#4c4a45]/60 hover:text-[#4c4a45]'
                )}
              >
                {active && (
                  <motion.span
                    layoutId="profile-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-[#4b6b56] shadow-md shadow-[#4b6b56]/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <HugeiconsIcon icon={icon} size={16} strokeWidth={2} />
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease }}
          >
            {tab === 'orders' ? <OrdersTab orders={orders} /> : <EditTab user={user} />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}

export function SignOutButton({ action }: { action: () => Promise<void> }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        setPending(true);
        await action();
      }}
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-full border border-[#161512]/15 bg-white px-4 py-2 text-xs font-semibold tracking-wider text-[#4c4a45] uppercase transition-colors hover:border-[#161512]/40 hover:text-[#161512] disabled:opacity-50"
    >
      <HugeiconsIcon
        icon={Logout01Icon}
        size={15}
        strokeWidth={2}
        className={cn(pending && 'animate-pulse')}
      />
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
