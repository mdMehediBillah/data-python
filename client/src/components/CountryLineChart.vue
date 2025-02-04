<template>
  <div>
    <!-- Chart Header -->
    <div class="chart-header" ref="barChartHeader">
      <h3 class="text-3xl bold">Carbon Content by Country</h3>
    </div>

    <!-- Chart Container -->
    <div class="chart-container" ref="barChartContainer">
      <canvas ref="canvas"></canvas>
    </div>

    <!-- Modal for Showing Carbon Content Data (Visible when clickedData is not null) -->
    <div v-if="clickedData" class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <h4>Details:</h4>
        <p><strong>Country:</strong> {{ clickedData.country }}</p>
        <p><strong>Carbon Content:</strong> {{ clickedData.carbonContent }}</p>
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
    ...mapGetters(["getAllData"]), // Get all data from Vuex store
  },
  data() {
    return {
      clickedData: null, // Data for the clicked bar
    };
  },
  watch: {
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
          // Handle click event to capture clicked bar data
          onClick: (event, elements) => {
            if (elements.length > 0) {
              // Get the index of the clicked element
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
