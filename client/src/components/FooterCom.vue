<template>
  <div class="bg-gray-900 text-white mt-10 flex-grow">
    <footer class="container mx-auto max-w-screen-xl py-10 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
        <!-- Logo Section -->
        <div class="pb-12">
          <img src="../assets/logo-footer.svg" alt="Logo" class="h-12 w-auto" />
        </div>
        <div class="grid grid-cols-2 gap-4 pb-8">
          <!-- Products Section -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Products</h3>
            <ul class="space-y-2 text-gray-400 text-left">
              <li><a href="#" class="hover:text-white">Product 1</a></li>
              <li><a href="#" class="hover:text-white">Product 2</a></li>
              <li><a href="#" class="hover:text-white">Product 3</a></li>
            </ul>
          </div>
          <!-- Use Cases & Resources Section -->
          <div>
            <h3 class="text-lg font-semibold mb-3">Use Cases</h3>
            <ul class="space-y-2 text-gray-400 text-left">
              <li><a href="#" class="hover:text-white">Industry 1</a></li>
              <li><a href="#" class="hover:text-white">Industry 2</a></li>
            </ul>
            <h3 class="text-lg font-semibold mt-5 mb-3">Resources</h3>
            <ul class="space-y-2 text-gray-400 text-left">
              <li><a href="#" class="hover:text-white">Blog</a></li>
              <li><a href="#" class="hover:text-white">Docs</a></li>
              <li><a href="#" class="hover:text-white">Help Center</a></li>
            </ul>
          </div>
        </div>

        <!-- Newsletter & Social Media Section -->
        <div>
          <h3 class="text-lg font-semibold mb-3">Newsletter</h3>
          <p class="text-sm text-gray-400 mb-3 text-left">
            Subscribe to get the latest updates.
          </p>
          <div class="flex">
            <input
              type="email"
              placeholder="Your email"
              class="p-2 w-full text-gray-900 rounded-l-md"
            />
            <button class="bg-primary text-white px-2 py-2 rounded-r-md">
              Subscribe
            </button>
          </div>
          <h3 class="text-lg font-semibold mt-5 mb-3">Follow Us</h3>
          <div class="flex space-x-2 rounded-md items-center">
            <img src="../assets/linkedin.svg" alt="linkedin" class="h-10" />
            <img src="../assets/x.svg" alt="x" class="h-8 bg-gray-200" />
            <img src="../assets/instagram.svg" alt="instagram" class="h-10" />
          </div>
        </div>
      </div>
    </footer>
    <div>
      <p class="text-sm text-gray-400 py-5 bg-slate-700">
        © 2025 Carbon Mind. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
/* Custom styles */
.bg-primary {
  background-color: var(--color-primary);
}
</style>
