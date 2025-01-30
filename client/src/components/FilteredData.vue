<template>
  <div>
    <div class="container-header">
      <div>
        <h2>Filtered Data</h2>
      </div>
      <div>
        <label>Filter Country:</label>
        <select v-model="selectedCountry" class="select-country">
          <option value="">All</option>
          <option
            v-for="country in countryList"
            :key="country"
            :value="country"
          >
            {{ country }}
          </option>
        </select>
      </div>
    </div>

    <div>
      <table>
        <thead>
          <tr>
            <th
              v-for="col in selectedColumns"
              :key="col"
              class="allDataHeader"
              :title="col"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paginatedData" :key="row.country">
            <td v-for="col in selectedColumns" :key="col" class="allDataBody">
              {{ row[col] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentPage: 1, // Tracks current page
      rowsPerPage: 10, // Number of rows per page
    };
  },
  computed: {
    ...mapGetters([
      "getFilteredData",
      "getSelectedColumns",
      "getSelectedCountry",
      "getAllData",
    ]),

    selectedData() {
      return this.getFilteredData;
    },

    selectedColumns() {
      return this.getSelectedColumns;
    },

    selectedCountry: {
      get() {
        return this.getSelectedCountry;
      },
      set(value) {
        this.setSelectedCountry(value);
      },
    },

    countryList() {
      return ["All", ...new Set(this.getAllData.map((row) => row.country))];
    },

    // **Pagination Logic**
    totalPages() {
      return Math.ceil(this.selectedData.length / this.rowsPerPage);
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      const end = start + this.rowsPerPage;
      return this.selectedData.slice(start, end);
    },
  },
  methods: {
    ...mapMutations(["setSelectedCountry"]),

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>

<style scoped>
/* Pagination Styles */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  background-color: #0449a3;
  color: white;
  border: none;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: gray;
  cursor: not-allowed;
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.select-country {
  margin: 10px;
  padding: 5px;
  font-size: 16px;
}
.allDataHeader {
  background-color: rgb(117, 6, 121);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  padding: 0.4rem;
  max-width: 160px; /* Adjust as needed */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Add "..." for overflow text */
}

.allDataBody {
  text-align: left;
  font-size: 0.9rem;
  padding: 0.2rem;
  max-width: 160px; /* Adjust as needed */
  /* white-space: nowrap; Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Add "..." for overflow text */
  text-align: center;
}
tr:nth-child(even) {
  background-color: #3d3d3d;
}
</style>
