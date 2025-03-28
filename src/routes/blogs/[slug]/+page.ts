import type { PageLoad } from './$types';
import { client } from '$lib/graphql/client';
import { gql } from '@urql/svelte';

// Disable prerendering for this dynamic route
export const prerender = false;
// Enable SSR to ensure the page is rendered on the server
export const ssr = true;

const query = gql`
  query NewQuery($id: ID!) {
    post(id: $id, idType: ID) {
      slug
      content
      author {
        node {
          id
        }
      }
      date
    }
  }
`;

export const load: PageLoad = async ({ params }) => {
  const id = params.slug; // Use the URL path segment as the id
  if (!id) {
    console.error('No ID provided in URL');
    return {
      status: 404,
      error: 'Post ID not provided in URL',
      post: null
    };
  }

  const result = await client.query(query, { id }).toPromise();

  if (result.error || !result.data?.post) {
    const errorMessage = result.error?.message || 'Post not found';
    console.error('Error fetching post:', errorMessage);
    return {
      status: 404,
      error: errorMessage,
      post: null
    };
  }

  return {
    post: result.data.post
  };
};