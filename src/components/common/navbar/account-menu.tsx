'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  UserIcon,
  Login02Icon,
  UserAdd01Icon,
  PackageOpenIcon,
  UserAccountIcon,
  StarIcon,
  RefreshIcon,
  GridIcon,
  Logout01Icon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';

import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export function AccountMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [pending, setPending] = useState(false);

  const user = session?.user;

  const handleSignOut = async () => {
    setPending(true);
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="cursor-pointer outline-none"
        aria-label={user ? 'Your account menu' : 'Account menu'}
      >
        <button type="button">
          <HugeiconsIcon icon={UserIcon} size={19} strokeWidth={1.5} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-1.5">
        {user ? (
          <>
            <div className="px-3 py-2.5">
              <p className="truncate text-sm font-semibold text-foreground">{user.name}</p>
              <p className="truncate text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/profile/orders">
                  <HugeiconsIcon icon={PackageOpenIcon} size={15} strokeWidth={2} />
                  Orders
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={12}
                    strokeWidth={2}
                    className="ml-auto text-[#4c4a45]/30"
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/settings">
                  <HugeiconsIcon icon={UserAccountIcon} size={15} strokeWidth={2} />
                  Manage profile
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={12}
                    strokeWidth={2}
                    className="ml-auto text-[#4c4a45]/30"
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/my-reviews">
                  <HugeiconsIcon icon={StarIcon} size={15} strokeWidth={2} />
                  My reviews
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={12}
                    strokeWidth={2}
                    className="ml-auto text-[#4c4a45]/30"
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/returns">
                  <HugeiconsIcon icon={RefreshIcon} size={15} strokeWidth={2} />
                  Returns
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={12}
                    strokeWidth={2}
                    className="ml-auto text-[#4c4a45]/30"
                  />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/collections">
                  <HugeiconsIcon icon={GridIcon} size={15} strokeWidth={2} />
                  Collections
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={12}
                    strokeWidth={2}
                    className="ml-auto text-[#4c4a45]/30"
                  />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              disabled={pending}
              onSelect={(e) => {
                e.preventDefault();
                handleSignOut();
              }}
            >
              <HugeiconsIcon icon={Logout01Icon} size={15} strokeWidth={2} />
              {pending ? 'Signing out…' : 'Log out'}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Welcome to Livo</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/login">
                  <HugeiconsIcon icon={Login02Icon} size={15} strokeWidth={2} />
                  Sign in
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/signup">
                  <HugeiconsIcon icon={UserAdd01Icon} size={15} strokeWidth={2} />
                  Create account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AccountMenu;
