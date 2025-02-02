<template>
  <div>
    <div class="chart-header" ref="barChartHeader">
      <h3 class="text-3xl bold">Carbon Content by Country</h3>
    </div>
    <div class="chart-container" ref="barChartContainer">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

import { Chart, registerables } from "chart.js";
import { mapGetters } from "vuex";
import { nextTick } from "vue";

Chart.register(...registerables);

export default {
  computed: {
    ...mapGetters(["getAllData"]), // Get all data from Vuex store
    countryCounts() {
      return this.getCountryCounts;
    },
  },
  watch: {
    countryCounts: {
      handler() {
        this.renderChart();
      },
      immediate: true,
    },
    getAllData: {
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

      // Extract unique countries & their corresponding carbonContent values
      const countryData = this.getAllData.reduce((acc, row) => {
        if (row.country && row.carbonContent !== undefined) {
          acc[row.country] = parseFloat(row.carbonContent) || 0;
        }
        return acc;
      }, {});

      const labels = Object.keys(countryData);
      const values = Object.values(countryData);

      const chartHeight = Math.max(200, labels.length * 5);
      canvas.height = chartHeight;

      this.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Carbon Content by Country",
              data: values,
              borderColor: "rgba(255, 99, 132, 1)", // Line color
              backgroundColor: "rgba(255, 99, 132, 0.2)", // Fill color
              borderWidth: 3,
              pointRadius: 3,
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
              tension: 0.6, // Smooth curve
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Carbon Content",
              },
            },
            x: {
              title: {
                display: true,
                text: "Countries",
              },
              ticks: {
                autoSkip: false, // Show all country names
                font: {
                  size: 10,
                },
              },
            },
          },
        },
      });
    },
    animatePageElements() {
      const tl = gsap.timeline();
      // Animate header fade-in
      tl.from(this.$refs.barChartHeader, {
        opacity: 0,
        x: -100,
        duration: 0.8,
        ease: "power4.out",
      });
      // Animate the table wrapper element with overlap
      tl.from(
        this.$refs.barChartContainer,
        {
          opacity: 0,
          x: -20,
          duration: 0.8,
          ease: "power4.out",
        },
        "-=0.5"
      );
    },
  },
  mounted() {
    // Trigger animation after the component is mounted
    this.animatePageElements();
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
  overflow-x: auto;
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
