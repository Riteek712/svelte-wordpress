<script lang="ts">
  import Footer from '$lib/components/Footer.svelte';
  import Header from '$lib/components/Header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex flex-col min-h-screen">
<Header />
<main class="flex-grow">
	{@render children()}
</main>

<Footer />
</div>
