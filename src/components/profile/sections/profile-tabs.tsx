'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import { PackageOpenIcon, UserAccountIcon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';

const ease = [0.16, 1, 0.3, 1] as const;

type Tab = 'orders' | 'profile';

interface ProfileTabsProps {
  ordersSection: ReactNode;
  editSection: ReactNode;
}

export function ProfileTabs({ ordersSection, editSection }: ProfileTabsProps) {
  const [tab, setTab] = useState<Tab>('orders');

  return (
    <>
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
          {tab === 'orders' ? ordersSection : editSection}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
