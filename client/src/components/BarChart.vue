<template>
  <div class="chart-container">
    <!-- Display the chart only when there is data -->
    <canvas v-if="chartData.length > 0" ref="chartCanvas"></canvas>

    <!-- Display a message when there is no data -->
    <p v-else>No data available</p>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted, watch } from "vue";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default defineComponent({
  props: {
    countryData: {
      type: Array,
      default: () => [], // Default to an empty array if no data is passed
    },
  },
  setup(props) {
    const chartCanvas = ref(null); // Reference to the canvas element
    let chartInstance = null; // Reference to the Chart.js instance
    const chartData = ref([]); // Data for the chart

    // Function to validate data and calculate total GWP for each country
    const calculateData = (data) => {
      console.log("Raw Data:", data); // Log incoming data to verify it's passed correctly

      // Check if the data is valid and is an array
      if (!Array.isArray(data) || data.length === 0) {
        console.log("No data available or invalid format");
        return []; // Return an empty array if data is not available or invalid
      }

      return data.map((item) => {
        // Log each item to see the structure of the data
        console.log("Item:", item);

        // Adjust the column names based on your data
        const GWP100 =
          item[
            "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change - global warming potential (GWP100) [kg CO2-Eq]:"
          ] || 0;
        const biogenicEmissionsGWP100 =
          item[
            "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic emissions - global warming potential (GWP100) [kg CO2-Eq]:"
          ] || 0;
        const biogenicRemovalGWP100 =
          item[
            "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic removal - global warming potential (GWP100) [kg CO2-Eq]:"
          ] || 0;

        // Calculate the total GWP
        const totalGwp =
          GWP100 + biogenicEmissionsGWP100 + biogenicRemovalGWP100;

        return {
          country: item.country, // Assuming the country column is named 'country'
          totalGwp, // Total value to show on the bar chart
        };
      });
    };

    // Function to initialize the chart
    const initializeChart = () => {
      const calculatedData = calculateData(props.countryData);

      // If the data is valid and contains countries
      if (calculatedData.length === 0) {
        chartData.value = []; // No valid data
        console.log("No valid data to display");
        return;
      }

      // Set the chart data
      chartData.value = calculatedData;

      const countries = calculatedData.map((item) => item.country);
      const totalGwpData = calculatedData.map((item) => item.totalGwp);

      // Initialize the chart
      chartInstance = new ChartJS(chartCanvas.value, {
        type: "bar",
        data: {
          labels: countries, // Country names as labels
          datasets: [
            {
              label: "Total GWP100 (kg CO2-Eq)",
              data: totalGwpData, // Calculated total GWP100 values
              backgroundColor: "#ff6b6b", // Set bar color
              borderColor: "#ff6b6b", // Set border color
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true, // Ensures the y-axis starts from 0
              ticks: {
                stepSize: 0.1, // Adjust step size based on your data range
              },
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Total GWP100 by Country",
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.raw} kg CO2-Eq`; // Customize the tooltip label
                },
              },
            },
          },
        },
      });
    };

    // Watch for changes in `countryData` and reinitialize chart if data changes
    watch(
      () => props.countryData,
      () => {
        initializeChart();
      },
      { immediate: true } // Run immediately when the component is mounted
    );

    onMounted(() => {
      // Initialize chart when the component is mounted
      initializeChart();
    });

    onUnmounted(() => {
      // Destroy the chart when the component is unmounted
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      chartCanvas,
      chartData, // Bind chartData to the template to control conditional rendering
    };
  },
});
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

p {
  text-align: center;
  color: #888;
  font-size: 1.2rem;
  padding: 20px;
}
</style>
