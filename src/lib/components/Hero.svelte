<script lang="ts">
  interface HeroContent {
      title?: string;
      subtitle?: string;
      ctaButton?: string;
      heroImage?: string;
  }
  export let content: HeroContent;
  console.log(content)
</script>

<section class="relative min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/mountain.jpg');">
  <!-- Overlay -->
  <div class="absolute inset-0 bg-[rgba(219,219,219,0.85)]"></div>

  <div class="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
    <!-- Left Side: Text and Button -->
    <div class="md:w-1/2 mb-8 md:mb-0">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          {@html (content.title ? content.title.replace(/\n/g, "<br>") : "")}
      </h1>
      <p class="text-xl text-gray-600 mb-6">
       {content.subtitle}
      </p>
      <button
        class="bg-green-500 text-black font-bold px-6 py-3 rounded-full hover:bg-green-600 transition-colors flex items-center"
        aria-label="Book a demo"
      >
       {content.ctaButton}
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>

    <!-- Right Side: Video/Illustration -->
    <div class="md:w-1/2">
      <img
        src={content.heroImage}
        alt="Illustration of a person working at a desk with a computer"
        class="w-full rounded-lg shadow-md"
      />
    </div>
  </div>
</section>
