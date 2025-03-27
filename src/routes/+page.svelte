<script lang="ts">
  import Hero from "$lib/components/Hero.svelte";
import ProblemAdvantages from "$lib/components/ProblemAdvantages.svelte";
  import Testimonials from "$lib/components/Testimonials.svelte";
  import type { PageData } from './$types'; 

  export let data: PageData;

</script>
<svelte:head>
    <title>Projecto</title>
    <meta name="description" content="Streamline your project management with Projecto - All stakeholders, one platform, zero IT overhead.">
</svelte:head>
<Hero content={data.wordpressContent.heroSection} />
<ProblemAdvantages problemContent={data.wordpressContent.problemSection} advantagesContent={data.wordpressContent.advantagesSection}/>
<Testimonials content={data.wordpressContent.testimonialsSection}/>
