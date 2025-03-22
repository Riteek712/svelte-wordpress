<script lang="ts">
    import { Linkedin, Youtube, Facebook, Instagram } from "lucide-svelte";
    const currentYear = new Date().getFullYear();
  </script>
  
  <footer class="bg-gradient-to-t from-lime-200 to-white text-gray-700 text-center p-6 md:p-10">
    <!-- Logo & Description -->
    <div class="flex flex-col items-center space-y-2">
      <div class="flex items-center space-x-2">
        <img src="/logos/projecto-logo.png" alt="Projecto Logo" class="h-8" />
        <span class="text-lg font-bold">PROJECTO</span>
        <span class="text-sm text-gray-500">by</span>
        <img src="/logos/charge-easy-logo.png" alt="Charge Easy" class="h-6" />
      </div>
      <p class="text-sm md:text-base text-gray-600 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
      </p>
    </div>
  
    <!-- Footer Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 text-left">
      <!-- Address -->
      <div>
        <h3 class="font-semibold">Our Address</h3>
        <p class="text-sm text-gray-600">
          Lorem LLC<br />
          Street 123<br />
          10100 Tallinn, Estonia
        </p>
      </div>
  
      <!-- Contact -->
      <div>
        <h3 class="font-semibold">Contact Us</h3>
        <p class="text-sm text-gray-600">Phone: +1 123 456 789</p>
        <p class="text-sm text-gray-600">E-Mail: info@example.com</p>
        <a href="/contact" class="mt-4 bg-lime-500 hover:bg-lime-600 text-white px-6 py-2 rounded-full flex items-center space-x-2">
          <span>Contact Us</span>
          <span>→</span>
        </a>
      </div>
  
      <!-- About Us -->
      <div>
        <h3 class="font-semibold">About us</h3>
        <ul class="text-sm text-gray-600 space-y-1">
          <li><a href="/" class="hover:underline">Home</a></li>
          <li><a href="/features" class="hover:underline">Features</a></li>
          <li><a href="/studies" class="hover:underline">Studies</a></li>
          <li><a href="/about" class="hover:underline">About us</a></li>
          <li><a href="/contact" class="hover:underline">Contact details</a></li>
        </ul>
      </div>
  
      <!-- Social Media & Legal -->
      <div>
        <h3 class="font-semibold">Follow us</h3>
        <div class="flex space-x-4 mt-2">
          <a href="https://linkedin.com/company/projecto" aria-label="Follow us on LinkedIn">
            <Linkedin class="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </a>
          <a href="https://youtube.com/projecto" aria-label="Follow us on YouTube">
            <Youtube class="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </a>
          <a href="https://facebook.com/projecto" aria-label="Follow us on Facebook">
            <Facebook class="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </a>
          <a href="https://instagram.com/projecto" aria-label="Follow us on Instagram">
            <Instagram class="w-5 h-5 text-gray-600 hover:text-gray-800" />
          </a>
        </div>
        <ul class="text-sm text-gray-600 space-y-1 mt-3">
          <li><a href="/privacy" class="hover:underline">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:underline">Terms and Conditions</a></li>
          <li><a href="/impressum" class="hover:underline">Impressum</a></li>
        </ul>
      </div>
    </div>
  
    <!-- Copyright -->
    <div class="mt-8 text-sm text-gray-600">
      © Copyright {currentYear} • Projecto • Alle Rechte vorbehalten.
    </div>
  </footer>