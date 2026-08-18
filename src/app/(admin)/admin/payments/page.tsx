import { PageHeader } from '@/components/admin/ui/page-header';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PaymentsState from '@/components/admin/payments/PaymentsState';
import PaymentsPageContent from '@/components/admin/payments/PaymentsPageContent';
import { getTransactionsAction } from '@/actions/payments/getTransactionsAction';

export default async function PaymentsRoute({
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

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['transactions', page, limit, search],
    queryFn: () => getTransactionsAction({ page, limit, search }),
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Payments"
        description="A live view of every transaction processed through your store."
      />
      <PaymentsState />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PaymentsPageContent />
      </HydrationBoundary>
    </div>
  );
}
