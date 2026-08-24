import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/query-client';

import DesignEditSlider from './DesignEditSlider';
import { designSliderQuery } from '@/queries/design-slider.query';

export default async function DesignEditSection() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(designSliderQuery('sofas')),
    queryClient.prefetchQuery(designSliderQuery('tables')),
    queryClient.prefetchQuery(designSliderQuery('chairs')),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DesignEditSlider />
    </HydrationBoundary>
  );
}
