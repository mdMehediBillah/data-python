<template>
  <div>
    <h1>Data Table</h1>

    <!-- Country Filter Dropdown -->
    <label for="country">Filter by Country:</label>
    <select @change="filterByCountry($event.target.value)">
      <option value="">All Countries</option>
      <option v-for="country in getCountries" :key="country" :value="country">
        {{ country }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in filteredData" :key="index">
          <td v-for="(value, key) in row" :key="key">
            {{ value !== null && value !== undefined ? value : "N/A" }}
          </td>
          <!-- <td v-for="(value, key) in row" :key="key">{{ value }}</td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["columns", "selectedCountry"]),
    ...mapGetters(["getFilteredData", "getCountries"]),
    filteredData() {
      return this.getFilteredData;
    },
    countries() {
      return this.getCountries;
    },
  },
  methods: {
    ...mapActions(["fetchData", "fetchCountries", "updateSelectedCountry"]),
    filterByCountry() {
      this.updateSelectedCountry(this.selectedCountry);
    },
  },
  mounted() {
    this.fetchData();
    this.fetchCountries();
  },
};
</script>

<style>
/* Add some basic styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
  font-size: 0.8rem;
}
th {
  background-color: #242424;
  color: rgb(255, 217, 0);
  font-size: 0.8rem;
}
label {
  font-weight: bold;
  margin-right: 10px;
}
select {
  padding: 5px;
  font-size: 16px;
}
</style>
