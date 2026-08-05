import { Container } from '@/components/shared/Container';
import { ProfileWelcome } from '../profile/sections/profile-welcome';
import { AccountNav } from './account-nav';
import type { ProfileUser } from '../profile/profile.data';

interface AccountShellProps {
  user: ProfileUser;
  children: React.ReactNode;
}

export function AccountShell({ user, children }: AccountShellProps) {
  return (
    <div className="bg-[#f6f5f1] min-h-screen">
      <ProfileWelcome user={user} />

      <Container className="py-8 sm:py-12 lg:py-16">
        <div className="flex gap-8 lg:gap-12">
          <AccountNav />
          <main className="flex-1 min-w-0 lg:max-w-3xl">{children}</main>
        </div>
      </Container>
    </div>
  );
}
