<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
  
    let isScrolled: boolean = false;
  
    function handleScroll() {
      isScrolled = window.scrollY > 50;
    }
  
    onMount(() => {
      if (browser) {
        window.addEventListener("scroll", handleScroll);
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
      <p class="">Get in touch with us today!</p>
    </div>
    
    <header class={`z flex justify-between items-center px-6 py-3 transition-all duration-300  w-full bg-white ${isScrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <div class="flex items-center space-x-2">
        <img src="/logos/projecto-logo.png" alt="Projecto Logo" class="h-8" />
        <span>by <img src="/logos/charge-easy-logo.png" alt="Charge Easy Logo" class="h-4" /></span>
      </div>
      
      <nav class="hidden md:flex space-x-6 text-gray-800">
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/for-whom">For Whom</a>
        <a href="/blogs">Blog</a>
        <a href="/about">About</a>
        <span class="cursor-pointer">🌐</span>
      </nav>
      
      <div class="flex space-x-2">
        <button class="px-4 py-2 rounded-full text-white font-semibold bg-lime-500 hover:bg-lime-600">Request an Offer</button>
        <button class="px-4 py-2 rounded-full text-white font-semibold bg-blue-400 hover:bg-blue-500">Book Consultation</button>
      </div>
    </header>
  </div>
  