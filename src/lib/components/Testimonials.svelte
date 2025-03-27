<script lang="ts">
  import { onMount } from 'svelte';

  interface TestimonialContent {
      sectionTitle?: string;
      testimonials?: Array<{
          text?: string;
          name?: string;
          position?: string;
          company?: string;
      }>;
  }

  export let content: TestimonialContent;

  // Define the type for a testimonial
  interface Testimonial {
    quote: string;
    role: string;
    company: string;
  }

  function buildTestimonials(testimonialsSection: TestimonialContent): Testimonial[] {
if (!testimonialsSection?.testimonials) return [];

return testimonialsSection.testimonials.map(t => ({
  quote: t.text?.replace(/(^“|”$)/g, '') || "No testimonial provided.",
  role: t.position || (t.name ? t.name.split("\n")[0] : "Unknown Role"),
  company: t.company || (t.name ? t.name.split("\n")[1] : "Unknown Company")
}));
}



  // Sample data for testimonials
  const testimonials: Testimonial[] = buildTestimonials(content)

  // State to track the current testimonial index
  let currentIndex: number = 0;
  let interval: ReturnType<typeof setInterval> | null = null;

  // Function to handle navigation
  function goToPrevious(): void {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  }

  function goToNext(): void {
    currentIndex = (currentIndex + 1) % testimonials.length;
  }

  // Start auto-scroll
  function startAutoScroll(): void {
    stopAutoScroll(); // Ensure no duplicate intervals
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
    }, 5000); // Change testimonial every 5 seconds
  }

  // Stop auto-scroll
  function stopAutoScroll(): void {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  // Lifecycle: Start auto-scroll on mount and clean up on destroy
  onMount(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  });
</script>

<div class="bg-gray-100 py-12">
  <section class="max-w-6xl mx-auto px-4">
    <!-- Carousel Container -->
    <div
      class="relative"
      on:mouseover={stopAutoScroll} on:focus={stopAutoScroll}
      on:mouseout={startAutoScroll} on:blur={startAutoScroll}
      role="region"
      aria-label="Testimonials Carousel"
    >
      {#each testimonials as testimonial, index}
        {#if index === currentIndex}
          <div class="bg-white rounded-2xl shadow-sm p-4 relative transition-opacity duration-500 max-w-lg mx-auto text-center">
            <!-- Quotation Mark -->
            <span class="text-lime-300 text-9xl">“</span>

            <!-- Quote -->
            <p class="text-gray-600 mb-6 relative z-10">
              "{testimonial.quote}"
            </p>

            <!-- Separator Line -->
            <hr class="border-t border-gray-200 mb-4" />

            <!-- Role and Company -->
            <p class="text-lime-500 font-bold">{testimonial.role}</p>
            <p class="text-gray-500">{testimonial.company}</p>
          </div>
        {/if}
      {/each}

      <!-- Navigation Arrows -->
      <button
        on:click={goToPrevious}
        class="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Previous testimonial"
      >
        <svg class="w-6 h-6 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>
      <button
        on:click={goToNext}
        class="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
        aria-label="Next testimonial"
      >
        <svg class="w-6 h-6 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </section>
</div>
