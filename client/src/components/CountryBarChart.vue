<template>
  <div>
    <div class="chart-header" ref="barChartHeader">
      <h3 class="text-3xl bold">Countries Data Count</h3>
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
    ...mapGetters("analytics", ["getCountryCounts"]),
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

      const labels = Object.keys(this.countryCounts);
      const values = Object.values(this.countryCounts);

      // Dynamically adjust chart width for many countries
      const chartWidth = Math.max(600, labels.length * 6);
      canvas.width = chartWidth;

      this.chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Country Data Count",
              data: values,
              backgroundColor: "rgba(54, 162, 235, 0.9)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
              barThickness: 10, // Adjust bar thickness
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "x", // ✅ Keep bars vertical
          scales: {
            x: {
              ticks: {
                autoSkip: false, // ✅ Ensure all country names are displayed
                maxRotation: 90, // ✅ Prevent overlapping labels
                minRotation: 45, // ✅ Improve readability
                font: {
                  size: 10,
                },
              },
            },
            y: {
              beginAtZero: true,
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
        x: 100,
        duration: 0.8,
        ease: "power4.out",
      });
      // Animate the table wrapper element with overlap
      tl.from(
        this.$refs.barChartContainer,
        {
          opacity: 0,
          x: 20,
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
  overflow-x: auto; /* ✅ Scroll horizontally if needed */
  margin: 0 auto;
  background-color: var(--color-bg-light);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 1.6rem auto;
  text-align: center;
}
.chart-header {
  max-width: 1200px;
  margin-bottom: 1rem;
  margin: 1rem auto;
  padding-top: 2rem;
}
</style>
