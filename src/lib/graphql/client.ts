import { createClient } from '@urql/svelte';
import { fetchExchange } from '@urql/core';

export const client = createClient({
  url: import.meta.env.VITE_PUBLIC_WORDPRESS_API_URL, // Load from environment variable
  fetchOptions: () => ({
    headers: { 'Content-Type': 'application/json' }
  }),
  exchanges: [fetchExchange]
});
