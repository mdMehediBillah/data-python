<template>
  <div>
    <h1 class="text-3xl font-bold underline">Data Viewer</h1>

    <!-- Loading Spinner -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
      <p class="loadingText">Loading...</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="nav-menu">
      <button
        @click="$router.push('/all-data')"
        :class="['nav-button', { 'active-link': isActive('/all-data') }]"
      >
        All Data
      </button>
      <button
        @click="$router.push('/filtered-data')"
        :class="['nav-button', { 'active-link': isActive('/filtered-data') }]"
      >
        Filtered Data
      </button>
    </nav>

    <!-- This will render the selected route's component -->
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions(["fetchData"]),

    // Method to check if the route is active
    isActive(route) {
      return this.$route.path === route;
    },
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  mounted() {
    this.fetchData(); // Fetch data when the app loads
  },
};
</script>

<style scoped>
/* Loading spinner style */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  font-size: 1.2rem;
  color: #ff0000;
}

.spinner {
  border: 5px solid #f3f3f3; /* Light gray */
  border-top: 5px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

.loadingText {
  color: yellowgreen;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.nav-menu {
  display: flex;
  gap: 10px;
  margin: 20px auto;
  justify-content: center;
}

.nav-button {
  padding: 10px 15px;
  background-color: #074225;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-button:hover {
  background-color: #066435;
  transform: scale(1.05); /* Slight zoom effect on hover */
}

/* Active Button Style */
.active-link {
  background-color: #28a745; /* Change active color */
  color: white;
  font-weight: bold;
  border: none;
}
</style>
