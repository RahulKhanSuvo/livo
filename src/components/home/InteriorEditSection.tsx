import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { interiorSliderQuery } from '@/queries/interior-slider.query';
import InteriorEditSlider from './InteriorEditSlider';
import { getQueryClient } from '@/lib/query-client';
import { Container } from '../shared/Container';

export default async function InteriorEditSection() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(interiorSliderQuery('most-wanted')),
    queryClient.prefetchQuery(interiorSliderQuery('storage')),
    queryClient.prefetchQuery(interiorSliderQuery('accessories')),
  ]);

  return (
    <section className="w-full overflow-x-hidden py-12 bg-white">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-4">
          <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">
            Trusted Classics
          </span>
          <h2 className="text-4xl sm:text-5xl font-medium text-neutral-900 tracking-tight">
            Interior Essentials
          </h2>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InteriorEditSlider />
        </HydrationBoundary>
      </Container>
    </section>
  );
}
