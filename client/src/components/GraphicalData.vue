<template>
  <div class="pb-40 min-h-[100vh]">
    <!-- Loading spinner -->
    <div v-if="isLoading" class="loading-spinner">
      <div class="spinner"></div>
      <div class="loadingText">Loading...</div>
    </div>

    <!-- Content is displayed after loading -->
    <div v-else>
      <CountryBarChart />
      <CountryLineChart />
      <CountryPieChart />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountryBarChart from "./CountryBarChart.vue";
import CountryLineChart from "./CountryLineChart.vue";
import CountryPieChart from "./CountrPieChart.vue";

export default {
  components: {
    CountryBarChart,
    CountryLineChart,
    CountryPieChart,
  },
  computed: {
    ...mapGetters(["isLoading"]), // ✅ Get loading state from Vuex
  },
};
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loadingText {
  margin-top: 10px;
  font-size: 18px;
  color: #333;
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
