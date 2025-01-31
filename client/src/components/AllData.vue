<template>
  <div>
    <div class="container-header">
      <div>
        <h2>All Data</h2>
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
      <div>
        <label>Sort by</label>
        <select v-model="sortKey" class="select-sort">
          <option value="none">None</option>
          <!-- <option value="flowName">Flow Name</option> -->
          <!-- <option value="processName">Process Name</option> -->
          <option value="carbonContent">Carbon Content</option>
          <option
            value="Carbon Minds ISO 14067 (based on IPCC 2021) - climate change - global warming potential (GWP100) [kg CO2-Eq]"
          >
            Global Warming Potential
          </option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th
              v-for="col in columns"
              :key="col"
              class="allDataHeader"
              :title="col"
            >
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in paginatedData"
            :key="row.id"
            @click="openDetailModal(row)"
          >
            <td
              v-for="col in columns"
              :key="col"
              class="allDataBody"
              :title="row[col]"
            >
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

    <!-- Modal for row details -->
    <CountryDetailModal
      :isOpen="isModalOpen"
      :countryData="selectedRow"
      @close="closeDetailModal"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CountryDetailModal from "./CountryDetailModal.vue";

export default {
  components: {
    CountryDetailModal,
  },
  data() {
    return {
      selectedCountry: "",
      sortKey: "none",
      currentPage: 1,
      rowsPerPage: 10, // Adjust number of rows per page
      isModalOpen: false, // Modal visibility state
      selectedRow: null, // Stores the selected row data for modal
    };
  },
  computed: {
    ...mapGetters(["getAllData", "getColumns"]),

    filteredData() {
      let data = [...this.getAllData];

      // ✅ Apply country filter
      if (this.selectedCountry) {
        data = data.filter((row) => row.country === this.selectedCountry);
      }

      // ✅ Apply sorting
      if (this.sortKey !== "none") {
        data.sort((a, b) => {
          let valA = a[this.sortKey] ?? "";
          let valB = b[this.sortKey] ?? "";

          const isNumeric = [
            "carbonContent",
            "globalWarmingPotential",
          ].includes(this.sortKey);
          if (isNumeric) {
            valA = parseFloat(valA) || 0;
            valB = parseFloat(valB) || 0;
          }

          return valA > valB ? 1 : valA < valB ? -1 : 0;
        });
      }

      return data;
    },

    columns() {
      return this.getColumns;
    },

    countryList() {
      return [...new Set(this.getAllData.map((row) => row.country))].sort();
    },

    // **Pagination Logic**
    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },

    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredData.slice(start, start + this.rowsPerPage);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
    openDetailModal(row) {
      this.selectedRow = row;
      this.isModalOpen = true;
    },
    closeDetailModal() {
      this.isModalOpen = false;
      this.selectedRow = null;
    },
  },
  watch: {
    isModalOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = "hidden"; // Disable background scrolling
      } else {
        document.body.style.overflow = ""; // Restore scrolling when modal closes
      }
    },
  },
};
</script>

<style scoped>
/* Pagination Styling */
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
  background-color: rgb(6, 108, 121);
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

.allDataHeader {
  background-color: rgb(6, 108, 121);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  padding: 0.8rem 1rem;
  max-width: 160px;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.allDataBody {
  text-align: left;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  white-space: nowrap; /* ✅ Prevents wrapping */
  overflow: hidden; /* ✅ Hides overflow */
  text-overflow: ellipsis; /* ✅ Adds "..." for long text */
  max-width: 160px; /* ✅ Set a fixed width to see effect */
  margin-inline: 3px;
  text-align: center;
}

.select-country {
  margin: 10px;
  padding: 5px;
  font-size: 16px;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  max-height: 600px;
  /* border: 1px solid #ddd; */
  border-radius: 8px;
  padding: 5px;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
}

th {
  background-color: #6e3b3b;
  padding: 8px;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
}

td {
  padding: 8px;
  font-size: 14px;
  white-space: nowrap;
}

tr:nth-child(even) {
  background-color: #3d3d3d;
}

.select-sort {
  margin-left: 10px;
  padding: 5px;
  font-size: 14px;
}
</style>
