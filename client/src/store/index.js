import { createStore } from "vuex";
import analytics from "./analytics"; // Import analytics module
import axios from "axios";
import config from "../config";

const store = createStore({
  modules: {
    analytics, // ✅ Register analytics store
  },
  state: {
    data: [],
    filteredData: [],
    columns: [],
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
    countries: [],
    selectedCountry: "",
    selectedRow: null,
    sortOrder: "asc",
    loading: false,
  },

  mutations: {
    setData(state, payload) {
      console.log("Fetched Data:", payload);

      const { data, columns } = payload;

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
      if (order === "none") return;

      state.data.sort((a, b) => {
        let valA = a[key] ?? "";
        let valB = b[key] ?? "";

        // Convert to numbers if sorting by numeric values
        const isNumeric = ["carbonContent"].includes(key);
        if (isNumeric) {
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
        }

        return order === "asc" ? (valA > valB ? 1 : -1) : valA < valB ? 1 : -1;
      });
    },
  },

  actions: {
    async fetchData({ commit, dispatch }) {
      try {
        commit("setLoading", true);

        const response = await axios.get(`${config.API_BASE_URL}/api/v1/data`);

        if (response.data && response.data.data && response.data.columns) {
          commit("setData", response.data);

          // ✅ Dispatch analytics update **AFTER** setting data
          dispatch("analytics/analyzeCountryData", response.data.data);
        } else {
          console.error("Invalid data format received:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        commit("setLoading", false);
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
    isLoading: (state) => state.loading,
    getSelectedCountry: (state) => state.selectedCountry,
  },
});

export default store;
