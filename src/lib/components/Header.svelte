<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";

  export let selectedLanguage = writable("en"); // Default to English
  let isScrolled: boolean = false;
  let showLanguageDropdown: boolean = false;

  function handleScroll() {
    isScrolled = window.scrollY > 50;
  }

  function toggleDropdown() {
    showLanguageDropdown = !showLanguageDropdown;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }
  }

  function selectLanguage(lang: "en" | "de") {
    $selectedLanguage = lang;
    showLanguageDropdown = false;

    if (browser && window.location.pathname === "/blogs") {
      goto(`/blogs?lang=${lang}`, { replaceState: true });
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("scroll", handleScroll);

      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang === "en" || urlLang === "de") {
        $selectedLanguage = urlLang;
      }
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<div class="fixed top-0 left-0 w-full z-100">
  <div class="w-full bg-violet-400 text-center font-light p-1">
    <p>Get in touch with us today!</p>
  </div>

  <header
    class={`z flex justify-between items-center px-6 py-3 transition-all duration-300 w-full bg-white ${isScrolled ? "shadow-lg" : "shadow-md"}`}
  >
    <div class="flex items-center space-x-2">
      <img src="/logos/projecto-logo.png" alt="Projecto Logo" class="h-8" />
      <span>by <img src="/logos/charge-easy-logo.png" alt="Charge Easy Logo" class="h-4" /></span>
    </div>

    <nav class="hidden md:flex space-x-6 text-gray-800">
      <a href="/">Home</a>
      <a href="/">Features</a>
      <a href="/">For Whom</a>
      <a href="/blogs">Blog</a>
      <a href="/">About</a>
      <div class="relative">
        <button
          type="button"
          class="cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-1"
          aria-label="Toggle language selection"
          aria-expanded={showLanguageDropdown}
          on:click={toggleDropdown}
          on:keydown={handleKeydown}
        >
          <span>🌐</span>
          <span class="text-sm font-semibold">{$selectedLanguage}</span>
        </button>
        {#if showLanguageDropdown}
          <div class="absolute top-8 left-0 bg-white shadow-md rounded p-2">
            <button
              type="button"
              class="block w-full text-left hover:bg-gray-100 p-1 focus:outline-none focus:bg-gray-100 {$selectedLanguage === 'en' ? 'bg-gray-200 font-bold' : ''}"
              on:click={() => selectLanguage("en")}
            >
              English
            </button>
            <button
              type="button"
              class="block w-full text-left hover:bg-gray-100 p-1 focus:outline-none focus:bg-gray-100 {$selectedLanguage === 'de' ? 'bg-gray-200 font-bold' : ''}"
              on:click={() => selectLanguage("de")}
            >
              German
            </button>
          </div>
        {/if}
      </div>
    </nav>

    <div class="flex space-x-2">
      <button class="px-4 py-2 rounded-full text-white font-semibold bg-lime-500 hover:bg-lime-600">
        Request an Offer
      </button>
      <button class="px-4 py-2 rounded-full text-white font-semibold bg-blue-400 hover:bg-blue-500">
        Book Consultation
      </button>
    </div>
  </header>
</div>

<style>
  .cursor-pointer {
    cursor: pointer;
  }
</style>