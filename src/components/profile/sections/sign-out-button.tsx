'use client';

import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Logout01Icon } from '@hugeicons/core-free-icons';

import { cn } from '@/lib/utils';

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
