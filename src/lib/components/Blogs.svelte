<script lang="ts">
  import { client } from '$lib/graphql/client';
  import { gql } from '@urql/svelte';
  import { queryStore } from '@urql/svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Define types for the GraphQL response
  interface Language {
    slug: string;
  }

  interface Translation {
    language: {
      name: string;
      slug: string;
    };
    id: string;
    slug: string;
    title: string;
  }

  interface PostNode {
    id: string;
    content: string;
    date: string;
    language: Language;
    slug: string;
    title: string;
    translations: Translation[];
  }

  interface PostEdge {
    node: PostNode;
  }

  interface PostsData {
    posts: {
      edges: PostEdge[];
    };
  }

  interface BlogPost {
    date: string;
    title: string;
    excerpt: string;
    image: string | null;
    href: string;
  }

  const postsQuery = gql`
    query NewQuery {
      posts {
        edges {
          node {
            id
            content
            date
            language {
              slug
            }
            slug
            title
            translations {
              language {
                name
                slug
              }
              id
              slug
              title
            }
          }
        }
      }
    }
  `;

  const posts = queryStore<PostsData>({ client, query: postsQuery });

  // Get the current language from URL parameters
  $: currentLang = $page.url.searchParams.get('lang') || 'en';

  // Filter posts based on the current language
  $: filteredPosts = $posts.data?.posts.edges
    .filter(({ node }: PostEdge) => node.language.slug === currentLang)
    .map(({ node }: PostEdge) => {
      // Extract an excerpt from the content
      const excerptMatch = node.content.match(/<p>(.*?)(?:<\/p>|$)/);
      const excerpt = excerptMatch ? excerptMatch[1].slice(0, 100) + '...' : 'No excerpt available';
      
      // Extract the first image from the content or use default
      const image = node.content.match(/<img[^>]+src=["'](.*?)["']/)?.[1] || '/dummy-post-horisontal.jpg';

      return {
        date: new Date(node.date).toLocaleDateString(currentLang === 'de' ? 'de-DE' : 'en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        title: node.title || slugToSentenceCase(node.slug),
        excerpt,
        image,
        href: `/blogs/${node.id}?lang=${currentLang}` // Include language in the URL
      };
    }) || [];

  function slugToSentenceCase(slug: string): string {
    return slug
      .split('-')
      .map((word, index) => 
        index === 0 
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word.toLowerCase()
      )
      .join(' ');
  }

  let currentPage: number = 1;
  const postsPerPage = 6;
  $: totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  $: paginatedPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

  function goToPrevious(): void {
    if (currentPage > 1) currentPage -= 1;
  }

  function goToNext(): void {
    if (currentPage < totalPages) currentPage += 1;
  }

  function goToPage(page: number): void {
    currentPage = page;
  }

  // Navigate to the post page using goto and preserve the language parameter
  function navigateToPost(href: string): void {
    goto(href);
  }

  // Get translations for the blogs page
  $: blogsPageText = {
    en: {
      heading: 'Blog',
      description: 'Discover the latest insights on project management, automation, and efficiency improvements.',
      loading: 'Loading posts...',
      error: 'Error:',
      readMore: 'Read more',
      previous: 'Previous',
      next: 'Next'
    },
    de: {
      heading: 'Blog',
      description: 'Entdecken Sie die neuesten Erkenntnisse zu Projektmanagement, Automatisierung und Effizienzverbesserungen.',
      loading: 'Beiträge werden geladen...',
      error: 'Fehler:',
      readMore: 'Weiterlesen',
      previous: 'Zurück',
      next: 'Weiter'
    }
  }[currentLang];
</script>

<div class="h-[50vh] w-full flex items-center justify-center text-center flex-col bg-gray-50">
  <h1 class="text-4xl pt-12 font-bold text-gray-900 mb-4">{blogsPageText?.heading}</h1>
  <p class="text-lg text-gray-600 mb-12 max-w-2xl">
    {blogsPageText?.description}
  </p>
</div>

<section class="bg-gray-100 py-16">
  <div class="max-w-7xl mx-auto px-4">
    {#if $posts.fetching}
      <p class="text-center text-gray-600">{blogsPageText?.loading}</p>
    {:else if $posts.error}
      <p class="text-center text-red-500">{blogsPageText?.error} {$posts.error.message}</p>
    {:else if filteredPosts.length === 0}
      <p class="text-center text-gray-600">No posts available in {currentLang === 'de' ? 'German' : 'English'}.</p>
    {:else}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each paginatedPosts as post}
          <div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <img src={post.image} alt={post.title} class="w-full h-40 object-cover rounded-md mb-4" />
            <p class="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p class="text-gray-600 mb-4">{post.excerpt}</p>
            <button on:click={() => navigateToPost(post.href)} class="text-green-500 hover:text-green-600 flex items-center">
              {blogsPageText?.readMore}
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        {/each}
      </div>

      {#if totalPages > 1}
        <div class="flex justify-center mt-12 space-x-2">
          <button
            on:click={goToPrevious}
            class="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
            disabled={currentPage === 1}
            aria-label={blogsPageText?.previous}
          >
            {blogsPageText?.previous}
          </button>

          {#each Array(totalPages).fill(0) as _, index}
            {@const page = index + 1}
            {#if page === currentPage}
              <button
                class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center"
                aria-label={`Page ${page}`}
                aria-current="true"
              >
                {page}
              </button>
            {:else if Math.abs(page - currentPage) <= 2 || page === 1 || page === totalPages}
              <button
                on:click={() => goToPage(page)}
                class="w-8 h-8 text-gray-600 hover:text-gray-900 flex items-center justify-center"
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            {:else if Math.abs(page - currentPage) === 3}
              <span class="w-8 h-8 flex items-center justify-center text-gray-600">...</span>
            {/if}
          {/each}

          <button
            on:click={goToNext}
            class="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
            disabled={currentPage === totalPages}
            aria-label={blogsPageText?.next}
          >
            {blogsPageText?.next}
          </button>
        </div>
      {/if}
    {/if}
  </div>
</section>