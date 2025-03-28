<script lang="ts">
  import {page} from '$app/stores'
    import ContactPage from '$lib/components/ContactPage.svelte';
  import type { ContactFormField } from './proxy+page';

  const formFields = $page.data.formFields;

  </script>
  
  <section class="mt-2.5 h-[50vh] bg-[url('https://images.unsplash.com/photo-1593642634443-44adaa06623a')] bg-cover bg-center relative flex flex-col items-center justify-center text-center px-4">
    <!-- Gray Tint Overlay -->
    <div class="absolute inset-0 bg-gray-900/50"></div>
  
    <!-- Content (Above Overlay) -->
    <div class="relative  text-white">
      <h2 class="text-4xl font-bold mb-4">Let's Build the Future of Construction Together</h2>
      <p class="text-lg text-gray-300 mb-6">Have questions or want to see Projecto in action? Reach out to us or book a demo today.</p>
    </div>
  </section>
  
  <ContactPage content={formFields}/>
  <section class="mt-2.5 h-[30vh] flex flex-col items-center justify-center" >
	<h2 class="text-4xl font-semibold mb-4">Not sure where to start? Schedule a free consultantion today.</h2>
    <br/>
    <button class=" bg-lime-500 font-bold text-white p-4 rounded-4xl hover:bg-green-600">Schedule a Consultation</button>

  </section>