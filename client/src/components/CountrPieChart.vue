<template>
  <div class="pb-16">
    <div class="chart-header">
      <h3 class="text-3xl bold">Carbon % by Country</h3>
    </div>
    <div class="chart-container">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { mapGetters } from "vuex";
import { nextTick } from "vue";

Chart.register(...registerables);

export default {
  computed: {
    ...mapGetters(["getFilteredData"]), // Fetch data from Vuex
  },
  watch: {
    getFilteredData: {
      handler() {
        this.renderChart();
      },
      immediate: true,
    },
  },
  methods: {
    async renderChart() {
      await nextTick();

      const canvas = this.$refs.canvas;
      if (!canvas) {
        console.error("Canvas not found!");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Canvas context is not available!");
        return;
      }

      if (this.chart) {
        this.chart.destroy();
      }

      // **Process Data for Pie Chart**
      const countryData = this.getFilteredData;
      const carbonContentByCountry = {};

      countryData.forEach((row) => {
        const country = row.country;
        const carbonContent = parseFloat(row.carbonContent) || 0;

        if (!carbonContentByCountry[country]) {
          carbonContentByCountry[country] = 0;
        }
        carbonContentByCountry[country] += carbonContent;
      });

      // **Convert to Percentage**
      const totalCarbon = Object.values(carbonContentByCountry).reduce(
        (sum, val) => sum + val,
        0
      );

      const labels = Object.keys(carbonContentByCountry);
      const values = Object.values(carbonContentByCountry).map(
        (val) => ((val / totalCarbon) * 100).toFixed(2) // Convert to %
      );

      this.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Carbon Content Percentage",
              data: values,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
              hoverOffset: 20,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                },
              },
            },
            legend: {
              position: "right",
            },
          },
        },
      });
    },
  },
  mounted() {
    this.renderChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--color-bg-light);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1.6rem auto;
}

.chart-header {
  max-width: 1200px;
  margin-bottom: 1rem;
  margin: 1rem auto;
  padding-top: 2rem;
}
</style>
