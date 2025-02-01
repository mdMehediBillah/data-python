<template>
  <div>
    <Header />

    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
      <div class="loadingText">Loading...</div>
    </div>
    <div v-if="!isLoading">
      <!-- This will render the selected route's component -->
      <router-view></router-view>
    </div>
    <FooterCom />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header.vue";
import FooterCom from "./components/FooterCom.vue";

export default {
  components: {
    Header,
    FooterCom,
  },
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  gap: 10px;
  font-size: 1.2rem;
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
</style>
