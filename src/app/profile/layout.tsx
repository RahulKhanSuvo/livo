import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { AccountShell } from '@/components/profile/account-shell';

export const metadata = {
  title: {
    default: 'Your account — Livo',
    template: '%s — Livo',
  },
};

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  return (
    <AccountShell
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    >
      {children}
    </AccountShell>
  );
}
