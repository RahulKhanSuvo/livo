import { Container } from '@/components/shared/Container';
import { ProfileWelcome } from './sections/profile-welcome';
import { ProfileTabs } from './sections/profile-tabs';
import { OrdersSection } from './sections/orders-section';
import { EditSection } from './sections/edit-section';
import type { ProfileOrder, ProfileUser } from './profile.data';

interface ProfileShellProps {
  user: ProfileUser;
  orders: ProfileOrder[];
}

export function ProfileShell({ user, orders }: ProfileShellProps) {
  return (
    <div className="bg-[#f6f5f1]">
      <ProfileWelcome user={user} />

      <Container className="py-12 sm:py-16">
        <ProfileTabs
          ordersSection={<OrdersSection orders={orders} />}
          editSection={<EditSection user={user} />}
        />
      </Container>
    </div>
  );
}
