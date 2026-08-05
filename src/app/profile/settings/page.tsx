import { getProfileUser } from '@/components/profile/get-session';
import { SettingsForm } from '@/components/profile/settings/settings-form';

export const metadata = { title: 'Settings' };

export default async function SettingsPage() {
  const user = await getProfileUser();

  return <SettingsForm name={user.name} email={user.email} />;
}
