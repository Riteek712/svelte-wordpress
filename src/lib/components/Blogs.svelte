<!-- BlogSection.svelte -->
<script lang="ts">
    // Define the type for a blog post
    interface BlogPost {
      date: string;
      title: string;
      excerpt: string;
      image: string;
      href: string;
    }
  
    // Sample data for blog posts
    const blogPosts: BlogPost[] = [
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
      {
        date: "February 20, 2024",
        title: "Why Construction Project Delays Happen and How to Solve Them with Automation",
        excerpt: "Delays in construction projects aren’t just frustrating—they’re expensive...",
        image: "/blogs.jpg",
        href: "/blog/why-construction-project-delays-happen",
      },
    ];
  
    // Pagination state
    let currentPage: number = 2;
    const totalPages: number = 15;
  
    // Functions for pagination
    function goToPrevious(): void {
      if (currentPage > 1) {
        currentPage -= 1;
      }
    }
  
    function goToNext(): void {
      if (currentPage < totalPages) {
        currentPage += 1;
      }
    }
  
    function goToPage(page: number): void {
      currentPage = page;
    }
  </script>
  
  <div class="h-[50vh] w-full flex items-center justify-center text-center flex-col">
    <h1 class="text-4xl font-bold text-gray-900 text-center mb-4">Blog</h1>
  <p class="text-lg text-gray-600 text-center mb-12">
    Discover the latest insights on project management, automation, and efficiency improvements.
  </p>
   </div>
  <section class="bg-gray-100 py-16">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Heading and Subheading -->
       
      
  
      <!-- Blog Post Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {#each blogPosts as post}
          <div class="bg-white rounded-lg shadow-sm p-6">
            <img src={post.image} alt="Construction project delay illustration" class="w-full h-40 object-cover rounded-md mb-4" />
            <p class="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 class="text-xl font-semibold text-gray-900 mb-2">{post.title}</h2>
            <p class="text-gray-600 mb-4">{post.excerpt}</p>
            <a href={post.href} class="text-green-500 hover:text-green-600 flex items-center">
              Read more
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        {/each}
      </div>
  
      <!-- Pagination -->
      <div class="flex justify-center mt-12 space-x-2">
        <button
          on:click={goToPrevious}
          class="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300"
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
  
        {#each Array(totalPages).fill(0) as _, index}
          {@const page = index + 1}
          {#if page === currentPage}
            <button
              class="w-8 h-8 bg-green-500 text-white rounded-full"
              aria-label={`Page ${page}`}
              aria-current="true"
            >
              {page}
            </button>
          {:else if Math.abs(page - currentPage) <= 2}
            <button
              on:click={() => goToPage(page)}
              class="w-8 h-8 text-gray-600 hover:text-gray-900"
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          {:else if page === 1 || page === totalPages}
            <button
              on:click={() => goToPage(page)}
              class="w-8 h-8 text-gray-600 hover:text-gray-900"
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
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  </section>