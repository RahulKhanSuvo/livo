import CustomersState from '@/components/admin/customers/CustomersState';
import { PageHeader } from '@/components/admin/ui/page-header';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/query-client';
import CustomersPageContent from '@/components/admin/customers/CustomersPageContnent';
import { getCustomersAction } from '@/actions/customer/getCustomersAction';

export default async function CustomersRoute({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 10;
  const search = typeof resolvedParams.search === 'string' ? resolvedParams.search : '';

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['customers', page, limit, search],
    queryFn: () => getCustomersAction({ page, limit, search }),
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Customers"
        description="Your community of homeowners, designers and repeat collectors."
      />
      <CustomersState />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CustomersPageContent />
      </HydrationBoundary>
    </div>
  );
}
