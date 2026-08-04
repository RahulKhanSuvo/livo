import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileShell } from '@/components/profile/profile-shell';
import { getOrders } from './_action';

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect('/login');
  }

  const user = session.user;
  const orders = await getOrders(user.id);

  return (
    <ProfileShell
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }}
      orders={orders}
    />
  );
}
