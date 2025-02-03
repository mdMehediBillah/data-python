<template>
  <header class="shadow-md fixed w-full top-0 left-0 z-50 header-base">
    <div class="container mx-auto px-12 py-3 flex items-center justify-between">
      <!-- Logo (Fixed Size) -->
      <div class="flex items-center">
        <img
          src="../assets/logo.svg"
          alt="Logo"
          class="w-[120px] h-auto cursor-pointer"
          @click="$router.push('/')"
        />
      </div>

      <!-- Desktop Navigation -->
      <nav class="hidden md:flex space-x-6">
        <router-link
          to="/all-data"
          class="nav-link"
          :class="{ 'active-link': isActive('/all-data') }"
        >
          All Data
        </router-link>
        <router-link
          to="/filtered-data"
          class="nav-link"
          :class="{ 'active-link': isActive('/filtered-data') }"
        >
          Filtered Data
        </router-link>
        <router-link
          to="/graphical-data"
          class="nav-link"
          :class="{ 'active-link': isActive('/graphical-data') }"
        >
          Graphical Data
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <button class="md:hidden flex flex-col space-y-1" @click="toggleMenu">
        <span
          class="w-6 h-0.5 bg-gray-700 transition-all"
          :class="{ 'rotate-45 translate-y-2': isMenuOpen }"
        ></span>
        <span
          class="w-6 h-0.5 bg-gray-700 transition-all"
          :class="{ 'opacity-0': isMenuOpen }"
        ></span>
        <span
          class="w-6 h-0.5 bg-gray-700 transition-all"
          :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"
        ></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <nav
      v-if="isMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 flex flex-col space-y-4 items-center"
    >
      <router-link
        to="/all-data"
        class="nav-link"
        :class="{ 'active-link': isActive('/all-data') }"
        @click="closeMenu"
      >
        All Data
      </router-link>
      <router-link
        to="/filtered-data"
        class="nav-link"
        :class="{ 'active-link': isActive('/filtered-data') }"
        @click="closeMenu"
      >
        Filtered Data
      </router-link>
      <router-link
        to="/graphical-data"
        class="nav-link"
        :class="{ 'active-link': isActive('/graphical-data') }"
        @click="closeMenu"
      >
        Graphical Data
      </router-link>
    </nav>
  </header>

  <!-- Spacing Fix: Adds padding so content does not go under the fixed header -->
  <div class="pt-20"></div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  computed: {
    isActive() {
      return (route) => this.$route.path === route;
    },
  },
};
</script>

<style scoped>
/* Navigation Link Styling */
.nav-link {
  @apply text-gray-700 hover:text-blue-500 font-medium transition-colors;
}

/* Active Link Styling */
.active-link {
  @apply text-blue-600 font-bold border-b-2 border-blue-600;
}

.header-base {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(137, 210, 252, 0.726);
}
</style>
