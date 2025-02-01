import { createStore } from "vuex";

export default {
  namespaced: true,
  state: {
    countryCounts: {}, // Object to store country frequencies
  },
  mutations: {
    SET_COUNTRY_COUNTS(state, counts) {
      state.countryCounts = counts;
    },
  },
  actions: {
    analyzeCountryData({ commit }, allData) {
      // Count occurrences of each country
      const counts = allData.reduce((acc, row) => {
        acc[row.country] = (acc[row.country] || 0) + 1;
        return acc;
      }, {});

      commit("SET_COUNTRY_COUNTS", counts);
    },
  },
  getters: {
    getCountryCounts(state) {
      return state.countryCounts;
    },
  },
};
