<template>
  <div class="pb-16">
    <!-- Chart Header -->
    <div class="chart-header" ref="barChartHeader">
      <h3 class="text-3xl bold">Carbon % by Country</h3>
    </div>

    <!-- Chart Container -->
    <div
      class="chart-container grid grid-cols-1 md:grid-cols-2 gap-4"
      ref="barChartContainer"
    >
      <canvas ref="canvas"></canvas>
    </div>

    <!-- Modal for Showing Carbon Content Data -->
    <div v-if="clickedData" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h4>Details:</h4>
        <p><strong>Country:</strong> {{ clickedData.country }}</p>
        <p>
          <strong>Carbon Content Percentage:</strong>
          {{ clickedData.carbonContent }}%
        </p>
        <button class="close-btn" @click="closeModal">Close</button>
      </div>
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
    ...mapGetters(["getFilteredData"]), // Fetch data from Vuex
  },
  data() {
    return {
      clickedData: null, // Data for the clicked pie chart segment
    };
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
          // Handle click event to capture clicked segment data
          onClick: (event, elements) => {
            if (elements.length > 0) {
              // Get the index of the clicked segment
              const clickedElementIndex = elements[0].index;
              const clickedCountry = labels[clickedElementIndex];
              const clickedCarbonContent = values[clickedElementIndex];

              // Set the clicked data to display in the modal
              this.clickedData = {
                country: clickedCountry,
                carbonContent: clickedCarbonContent,
              };

              // Disable background scrolling when modal is open
              document.body.style.overflow = "hidden";
            }
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
    },
    // Method to close the modal when clicking outside of it or on the close button
    closeModal() {
      this.clickedData = null;

      // Enable background scrolling when modal is closed
      document.body.style.overflow = "auto";
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

    // Ensure background scrolling is re-enabled before the component is destroyed
    document.body.style.overflow = "auto";
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

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal */
.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: var(--color-text-dark);
}

/* Close Button */
.close-btn {
  background-color: #ff6b6b;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

.close-btn:hover {
  background-color: #ff4d4d;
}
</style>
