<template>
  <div class="header-base">
    <div class="header-container">
      <!-- Page Title -->
      <div class="logo-container">
        <img
          src="../assets/logo.svg"
          alt="Logo"
          class="logo"
          @click="$router.push('/')"
        />
        <!-- <h1
          class="text-3xl font-bold text-primary border-b-2 border-primary pb-2"
        >
          Data Viewer
        </h1> -->
      </div>

      <!-- Navigation Menu -->
      <nav class="flex justify-center space-x-4 mt-6">
        <router-link
          to="/all-data"
          class="nav-button"
          :class="{ 'active-link': isActive('/all-data') }"
        >
          All Data
        </router-link>
        <router-link
          to="/filtered-data"
          class="nav-button"
          :class="{ 'active-link': isActive('/filtered-data') }"
        >
          Filtered Data
        </router-link>
        <router-link
          to="/graphical-data"
          class="nav-button"
          :class="{ 'active-link': isActive('/graphical-data') }"
        >
          Graphical Data
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isActive() {
      return (route) => this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50%; /* Adjust as needed */
  height: auto;
  margin-right: 10px;
  cursor: pointer;
}
.nav-button {
  padding: 10px 15px;
  color: var(--color-primary);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-button:hover {
  color: var(--color-cta);
  transform: scale(1.05); /* Slight zoom effect on hover */
}

/* Active Button Style */
.active-link {
  color: var(--color-cta);
  border-bottom: 2px solid var(--color-primary);
  font-weight: bold;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0.2rem 1rem;
}

.header-base {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.01);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(137, 210, 252, 0.726);
}
</style>
