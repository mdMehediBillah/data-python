// import { createStore } from "vuex";
// import axios from "axios";
// import config from "../config";

// const store = createStore({
//   state: {
//     data: [],
//     filteredData: [],
//     columns: [],
//     countries: [], // Store available country names
//     selectedCountry: "", // Selected country for filtering
//   },

//   mutations: {
//     setData(state, payload) {
//       const { data, columns } = payload;

//       // Ensure data order matches column order
//       const orderedData = data.map((row) => {
//         const orderedRow = {};
//         columns.forEach((col) => {
//           orderedRow[col] = row[col] || "";
//         });
//         return orderedRow;
//       });

//       state.data = orderedData;
//       state.columns = columns;
//       state.filteredData = orderedData;
//     },

//     setCountries(state, countries) {
//       state.countries = [...countries];
//     },

//     setSelectedCountry(state, country) {
//       state.selectedCountry = country;
//     },

//     filterByCountry(state, country) {
//       state.selectedCountry = country;

//       if (!country) {
//         state.filteredData = [...state.data]; // Show all data if no country is selected
//       } else {
//         state.filteredData = state.data.filter(
//           (row) => row["country"]?.toLowerCase() === country.toLowerCase()
//         );
//       }
//     },
//   },

//   actions: {
//     async fetchData({ commit, state }) {
//       try {
//         const response = await axios.get(`${config.API_BASE_URL}/data`);
//         commit("setData", response.data);
//         commit("filterData", state.selectedCountry);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     },

//     async fetchCountries({ commit }) {
//       try {
//         const response = await axios.get(`${config.API_BASE_URL}/countries`);
//         commit("setCountries", response.data.countries);
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     },

//     updateSelectedCountry({ commit, dispatch }, country) {
//       commit("setSelectedCountry", country);
//       commit("filterByCountry", country); // Apply filter immediately
//     },
//   },

//   getters: {
//     getFilteredData: (state) => state.filteredData,
//     getColumns: (state) => state.columns,
//     getCountries: (state) => state.countries,
//   },
// });

// export default store;

import { createStore } from "vuex";
import axios from "axios";
import config from "../config";

const store = createStore({
  state: {
    data: [], // Stores all fetched data
    filteredData: [], // Stores filtered data based on selected country
    columns: [], // Stores all column names
    countries: [], // Stores unique country names
    selectedCountry: "", // Default: Show all data
  },

  mutations: {
    setData(state, payload) {
      const { data, columns } = payload;

      // ✅ Store correct column order
      state.columns = [...columns];

      // ✅ Ensure data follows the correct column order
      const orderedData = data.map((row) => {
        const orderedRow = {};
        state.columns.forEach((col) => {
          orderedRow[col] = row[col] !== undefined ? row[col] : "N/A"; // Keep column order consistent
        });
        return orderedRow;
      });

      // ✅ Store full dataset
      state.data = orderedData;
      state.filteredData = orderedData;

      // ✅ Extract unique country names for filtering
      state.countries = [...new Set(data.map((row) => row.country))];
    },

    setSelectedCountry(state, country) {
      state.selectedCountry = country;

      // ✅ Filter data based on selected country
      if (!country) {
        state.filteredData = state.data;
      } else {
        state.filteredData = state.data.filter(
          (row) => row.country === country
        );
      }
    },
  },

  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/data`);
        commit("setData", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },

  getters: {
    getFilteredData: (state) => state.filteredData,
    getColumns: (state) => state.columns,
    getCountries: (state) => state.countries,
  },
});

export default store;
