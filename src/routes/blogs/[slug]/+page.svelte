<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  export let data: {
    post: {
      content: string;
      date: string;
      title: string;
      author: { node: { id: string } };
      slug: string;
      language: {
        name: string;
        slug: string;
      };
      translation: {
        id: string;
        slug: string;
        title: string;
      } | null;
    } | null;
    currentLang: string;
    status?: number;
    error?: string;
  };

  let isLoading = true;
  let hasError = false;
  let errorMessage = '';

  onMount(() => {
    if (data.status === 404) {
      hasError = true;
      errorMessage = data.error || 'Post not found';
    }
    isLoading = false;
  });

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

  function processContent(content: string) {
    if (!content) return '';

    // Check if '<figure>' exists
    if (!content.includes('</figure>')) {
      return content; // Return original content if no <figure> tag is present
    }

    const parts = content.split('</figure>');
    return parts.length > 1 ? parts[1] : '';
  }

  function switchLanguage() {
    if (!data.post?.translation) return;
    
    // Get the target language (opposite of current language)
    const targetLang = data.currentLang === 'en' ? 'de' : 'en';
    
    // Navigate to the translated post with the new language parameter
    goto(`/blogs/${data.post.translation.id}?lang=${targetLang}`);
  }

  $: featuredImageUrl = data.post?.content.match(/<img[^>]+src=["'](.*?)["']/)?.[1] || '/default-blog-image.jpg';
  $: title = data.post?.title || (data.post ? slugToSentenceCase(data.post.slug) : '');
  $: processedContent = data.post ? processContent(data.post.content) : '';
  
  // Text translations for UI elements
  $: uiText = {
    en: {
      backToBlog: 'Back to Blog',
      switchToLanguage: data.post?.translation ? `View in ${data.post.translation.slug === 'en' ? 'English' : 'Deutsch'}` : '',
      loading: 'Loading...',
      notFound: 'Post not found'
    },
    de: {
      backToBlog: 'Zurück zum Blog',
      switchToLanguage: data.post?.translation ? `In ${data.post.translation.slug === 'en' ? 'Englisch' : 'Deutsch'} anzeigen` : '',
      loading: 'Wird geladen...',
      notFound: 'Beitrag nicht gefunden'
    }
  }[data.currentLang];
</script>

<style>
  /* Global styles for dynamically injected content */
  :global(.post-content h2) {
    font-size: 1.75rem; /* 28px */
    font-weight: bold;
    color: #2d3748; /* Dark gray */
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 2px solid #e2e8f0; /* Light gray underline */
    padding-bottom: 0.3rem;
  }

  :global(.post-content p) {
    font-size: 1rem; /* 16px */
    color: #4a5568; /* Medium gray */
    line-height: 1.75;
    margin-bottom: 1rem;
  }
</style>

{#if isLoading}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
  </div>
{:else if hasError}
  <div class="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p class="text-xl text-gray-600 mb-6">{errorMessage}</p>
      <a href={`/blogs?lang=${data.currentLang}`} class="text-purple-600 hover:underline text-lg">{uiText?.backToBlog}</a>
    </div>
  </div>
{:else}
  <div class="max-w-5xl mt-15 mx-auto px-4 py-12">
    <div class="flex justify-between items-center mb-6">
      <a href={`/blogs?lang=${data.currentLang}`} class="text-purple-600 hover:underline flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        {uiText?.backToBlog}
      </a>
      
      {#if data.post?.translation}
        <button
          on:click={switchLanguage}
          class="text-green-600 hover:underline flex items-center"
        >
          {data.currentLang === 'en' ? 'Auf Deutsch anzeigen' : 'View in English'}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      {/if}
    </div>

    <div class="flex flex-col md:flex-col gap-8 mb-12">
      <div class="w-full">
        <img src={featuredImageUrl} alt={title} class="w-full h-64 object-cover rounded-lg" />
      </div>

      <div class="w-full text-center flex flex-col justify-center">
        {#if data.post && data.post.date}
          <p class="text-gray-500 text-sm mb-4">
            {new Date(data.post.date).toLocaleDateString(data.currentLang === 'de' ? 'de-DE' : 'en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </p>
        {/if}
        <h1 class="text-4xl font-bold text-gray-900 leading-tight">{title}</h1>
      </div>
    </div>

    <!-- Styled container to apply CSS -->
    <div class="post-content">
      {@html processedContent}
    </div>
  </div>
{/if}