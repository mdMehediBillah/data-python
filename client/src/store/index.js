import { createStore } from "vuex";
import axios from "axios";
import config from "../config";

const store = createStore({
  state: {
    data: [], // Stores all data from API
    filteredData: [], // Stores selected data
    columns: [], // All available columns
    selectedColumns: [
      "country",
      "flowName",
      "processName",
      "bioCarbonContent",
      "carbonContent",
      "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change - global warming potential (GWP100) [kg CO2-Eq]",
      "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic emissions - global warming potential (GWP100) [kg CO2-Eq]",
      "Carbon Minds ISO 14067 (based on IPCC 2021) - climate change: biogenic removal - global warming potential (GWP100) [kg CO2-Eq]",
    ],
    countries: [], // List of countries
    selectedCountry: "", // Selected country for filtering
    selectedRow: null, // Stores clicked row details
    sortOrder: "asc", // 🔄 Sorting order: 'asc' or 'desc'
    loading: false, // Track the loading state
  },

  mutations: {
    setData(state, payload) {
      console.log("Fetched Data:", payload);

      const { data, columns } = payload;

      // Set loading state to false after data is fetched
      state.loading = false;

      if (!data || !columns) {
        console.error("Missing data or columns in payload");
        return;
      }

      // Store all data
      state.data = [...data];

      // Store selected columns only
      state.filteredData = data.map((row) => {
        let filteredRow = {};
        state.selectedColumns.forEach((col) => {
          filteredRow[col] = row[col] !== undefined ? row[col] : "N/A";
        });
        return filteredRow;
      });

      // Extract unique countries
      state.countries = [...new Set(data.map((row) => row.country))];

      // Store all columns
      state.columns = [...columns];

      console.log("Stored All Data:", state.data);
      console.log("Stored Filtered Data:", state.filteredData);

      // Apply sorting
      // state.data.sort((a, b) => (a.country > b.country ? 1 : -1));
      // state.filteredData.sort((a, b) => (a.country > b.country ? 1 : -1));
    },

    setSelectedCountry(state, country) {
      state.selectedCountry = country;
      if (!country) {
        state.filteredData = state.data.map((row) => {
          let filteredRow = {};
          state.selectedColumns.forEach((col) => {
            filteredRow[col] = row[col] !== undefined ? row[col] : "N/A";
          });
          return filteredRow;
        });
      } else {
        state.filteredData = state.data
          .filter((row) => row.country === country)
          .map((row) => {
            let filteredRow = {};
            state.selectedColumns.forEach((col) => {
              filteredRow[col] = row[col] !== undefined ? row[col] : "N/A";
            });
            return filteredRow;
          });
      }
    },

    setLoading(state, status) {
      state.loading = status;
    },

    // Sort data based on selected key and order
    sortData(state, { key, order }) {
      if (order === "none") return; // No sorting applied

      state.data.sort((a, b) => {
        let valA = a[key] ?? "";
        let valB = b[key] ?? "";

        // Convert to numbers if sorting by numeric values
        const isNumeric = ["carbonContent"].includes(key);
        if (isNumeric) {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }

        if (order === "asc") {
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else if (order === "desc") {
          return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
        return 0;
      });
    },
  },

  actions: {
    async fetchData({ commit }) {
      try {
        // Set loading to true before fetching data
        commit("setLoading", true);

        const response = await axios.get(`${config.API_BASE_URL}/data`);

        if (response.data && response.data.data && response.data.columns) {
          commit("setData", response.data);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        commit("setLoading", false); // Stop loading if there is an error
      }
    },
  },

  getters: {
    getAllData: (state) => state.data,
    getFilteredData: (state) => state.filteredData,
    getColumns: (state) => state.columns,
    getSelectedColumns: (state) => state.selectedColumns,
    getCountries: (state) => state.countries,
    getSelectedRow: (state) => state.selectedRow,
    getSortOrder: (state) => state.sortOrder,
    isLoading: (state) => state.loading, // Get loading state
  },
});

export default store;
