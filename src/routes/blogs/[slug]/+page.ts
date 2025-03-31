import type { PageLoad } from './$types';
import { client } from '$lib/graphql/client';
import { gql } from '@urql/svelte';

// Disable prerendering for this dynamic route
export const prerender = false;
// Enable SSR to ensure the page is rendered on the server
export const ssr = true;

const query = gql`
  query NewQuery($id: ID!, $languageCode: LanguageCodeEnum!) {
    post(id: $id, idType: ID) {
      slug
      content
      title
      author {
        node {
          id
        }
      }
      date
      language {
        name
        slug
      }
      translation(language: $languageCode) {
        id
        slug
        title
      }
    }
  }
`;

export const load: PageLoad = async ({ params, url }) => {
  const id = params.slug; // Use the URL path segment as the id
  const currentLang = url.searchParams.get('lang') || 'en';

  // Ensure languageCode is always a valid value
  const languageCode: 'EN' | 'DE' = currentLang === 'en' ? 'DE' : 'EN';

  if (!id) {
    console.error('No ID provided in URL');
    return {
      status: 404,
      error: 'Post ID not provided in URL',
      post: null,
      currentLang
    };
  }

  const variables = { id, languageCode };

  const result = await client.query(query, variables).toPromise();

  if (result.error || !result.data?.post) {
    const errorMessage = result.error?.message || 'Post not found';
    console.error('Error fetching post:', errorMessage);
    return {
      status: 404,
      error: errorMessage,
      post: null,
      currentLang
    };
  }

  return {
    post: result.data.post,
    currentLang
  };
};
