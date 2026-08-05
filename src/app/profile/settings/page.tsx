import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { EditSection } from '@/components/profile/sections/edit-section';

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect('/login');

  const user = session.user;

  return (
    <EditSection
      user={{
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      }}
    />
  );
}
