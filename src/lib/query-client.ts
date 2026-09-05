import { cache } from 'react';
import { QueryClient, defaultShouldDehydrateQuery, isServer } from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },

      dehydrate: {
        // Important for streaming: also dehydrate pending queries so the
        // promise created on the server can be picked up by useSuspenseQuery
        // on the client instead of re-running the queryFn during render.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === 'pending',

        shouldRedactErrors: () => false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

// On the server, memoize the client per request so every getQueryClient()
// call within a single request (server component prefetch + QueryClientProvider)
// shares the same cache. Without this, the prefetched query lives in a
// different client than the one useSuspenseQuery reads, forcing a re-fetch
// (and a Server Action call) during render.
const getServerQueryClient = cache(makeQueryClient);

export function getQueryClient() {
  if (isServer) {
    return getServerQueryClient();
  }

  // Browser: reuse the same client
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
