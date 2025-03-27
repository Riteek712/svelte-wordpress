<script lang="ts">
  interface ProblemContent {
      sectionTitle?: string;
      problems?: Array<{
          percentage?: string;
          description?: string;
          image?: string;
      }>;
  }

  interface AdvantagesContent {
      sectionTitle?: string;
      beforeState?: {
          title?: string;
          items?: string[];
      };
      afterState?: {
          title?: string;
          items?: string[];
      };
  }

  export let problemContent: ProblemContent ;
  export let advantagesContent: AdvantagesContent; 

  const problems = [
    { stat: "42%", description: "of EV infrastructure projects are delayed by an average of 8-10", image: "/problems/problem1.jpg" },
    { stat: "42%", description: "of EV infrastructure projects are delayed by an average of 8-10", image: "/problems/problem2.jpg" },
    { stat: "42%", description: "of EV infrastructure projects are delayed by an average of 8-10", image: "/problems/problem1.jpg" },
    { stat: "42%", description: "of EV infrastructure projects are delayed by an average of 8-10", image: "/problems/problem2.jpg" },
  ];


</script>

<div class="bg-gray-100 min-h-screen py-12">
  <!-- The Problem We Solve Section -->
  <section class="max-w-7xl mx-auto px-4 mb-16">
    <h1 class="text-4xl font-bold text-center mb-10">The Problem We Solve</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {#each problems as problem}
        <div class="bg-white rounded-lg shadow-xl p-6 text-left">
          <h2 class="text-4xl font-bold text-green-500 mb-2">{problem.stat}</h2>
          <p class="text-gray-600 mb-4">{problem.description}</p>
          <img src={problem.image} alt="Problem illustration" class="w-full h-32 object-cover rounded-md" />
        </div>
      {/each}
    </div>
  </section>

  <!-- Advantages Section with Background Image -->
  <section class="relative min-h-screen flex items-center justify-center bg-cover bg-center" style="background-image: url('/mountain.jpg');">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-[rgba(219,219,219,0.85)]"></div>

    <div class="relative max-w-6xl mx-auto px-4">
      <h1 class="text-4xl font-bold text-center mb-10">Advantages</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Before -->
        <div class="bg-white rounded-lg shadow-lg shadow-red-500/50 p-6 relative">
          <h2 class="text-2xl font-semibold text-center mb-6">Before</h2>
          <ul class="space-y-4">
              {#each advantagesContent.beforeState?.items || [] as item}
              <li class="flex items-start">
                <span class="text-red-500 mr-2">●</span>
                <span class="text-gray-600">{item}</span>
              </li>
            {/each}
          </ul>
        </div>

        <!-- After -->
        <div class="bg-white rounded-lg shadow-lg shadow-lime-500/50 p-6 relative">
          <h2 class="text-2xl font-semibold text-center mb-6">After</h2>
          <ul class="space-y-4">
              {#each advantagesContent.afterState?.items || [] as item}
              <li class="flex items-start">
                <span class="text-lime-500 mr-2">●</span>
                <span class="text-gray-600">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>
</div>
