import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import AdminsContent from '@/components/admin/users/AdminsContent';
import { getAdminsAction } from '@/actions/users/getAdminsAction';

export default async function AdminsRoute() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['admins'],
    queryFn: () => getAdminsAction(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminsContent />
    </HydrationBoundary>
  );
}
