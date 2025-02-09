<template>
  <div class="pb-40 min-h-[70vh] px-12 py-6">
    <!-- Header -->
    <div
      class="grid grid-cols-1 md:grid-cols-1 gap-4 items-center justify-between mb-4 container-header"
      ref="header"
    >
      <!-- Filters & Sorting Section -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-3 items-center justify-between"
      >
        <div class="">
          <h3 class="text-3xl bold">All Data</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Column Selection -->
          <div class="relative flex justify-end">
            <button
              @click="toggleFilter"
              :style="{
                backgroundColor: showColumnFilter
                  ? 'red'
                  : 'var(--color-brand-light)',
              }"
              class="filter-btn text-white px-4 py-2 rounded-md transition-all w-44"
            >
              {{ showColumnFilter ? "Close Filter" : "Filter Columns" }}
            </button>

            <!-- Column Filter Panel -->
            <div
              v-if="showColumnFilter"
              ref="filterPanel"
              class="column-filter-panel bg-white shadow-lg p-4 rounded-md w-64"
            >
              <h4 class="font-semibold text-lg mb-3">Select Columns</h4>
              <div class="column-selection flex flex-row flex-wrap gap-3">
                <label
                  v-for="col in allColumns"
                  :key="col"
                  class="flex items-center gap-2 bg-gray-100 p-2 rounded-md text-sm max-w-52"
                >
                  <input
                    type="checkbox"
                    v-model="selectedColumns"
                    :value="col"
                    :disabled="
                      col === 'country' ||
                      col === 'carbonContent' ||
                      col === 'flowName' ||
                      col === 'CAS' ||
                      col === 'processName'
                    "
                    class="w-4 h-4 accent-blue-500"
                  />
                  <span class="text-gray-800">{{ col }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Country Filter -->
          <!-- <div class="flex items-center gap-2 w-full">
            <label class="w-44">Filter Country:</label>
            <select v-model="selectedCountry" class="select-country w-full">
              <option value="">All</option>
              <option
                v-for="country in countryList"
                :key="country"
                :value="country"
              >
                {{ country }}
              </option>
            </select>
          </div> -->

          <!-- Sorting Dropdown -->
          <div class="flex items-center gap-2 w-full">
            <label class="w-24">Sort by:</label>
            <select v-model="sortKey" class="select-sort w-full">
              <option value="none">None</option>
              <option value="carbonContent">Carbon Content</option>
              <option value="globalWarmingPotential">
                Global Warming Potential
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th
              v-for="col in selectedColumns"
              :key="col"
              class="allDataHeader"
              :title="col"
            >
              <div class="allDataHeader-text">
                {{ col }}
              </div>
              <div class="filter-input">
                <!-- Dropdown filter for 'country' column -->
                <select
                  v-if="col === 'country' || col === 'flowName'"
                  v-model="columnFilters[col]"
                  class="filter-dropdown"
                >
                  <option value="">All</option>
                  <option
                    v-for="option in getUniqueColumnValues(col)"
                    :key="option"
                    :value="option"
                  >
                    {{ option }}
                  </option>
                </select>

                <!-- Text input filter for other columns -->
                <input
                  v-else
                  v-model="columnFilters[col]"
                  type="text"
                  placeholder="Filter..."
                  class="filter-input"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredData.length === 0">
            <td :colspan="selectedColumns.length" class="bg-orange-100">
              <div class="flex justify-start">
                <p class="text-gray-700 w-[50vw] text-3xl font-semibold p-4">
                  No data available
                </p>
              </div>
            </td>
          </tr>

          <tr
            v-for="row in paginatedData"
            :key="row.id"
            @click="openDetailModal(row)"
            v-else
          >
            <td
              v-for="col in selectedColumns"
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

    <!-- Pagination -->
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage >= totalPages">
        Next
      </button>
    </div>

    <!-- Modal -->
    <CountryDetailModal
      :isOpen="isModalOpen"
      :countryData="selectedRow"
      @close="closeDetailModal"
    />
  </div>
</template>

<script>
import gsap from "gsap";
import { mapGetters } from "vuex";
import CountryDetailModal from "./CountryDetailModal.vue";

export default {
  components: { CountryDetailModal },
  name: "AllData",
  data() {
    return {
      selectedColumns: [], // Stores selected columns
      showColumnFilter: false, // Toggles column selection panel
      selectedCountry: "", // Country filter
      sortKey: "none", // Sorting
      currentPage: 1,
      rowsPerPage: 10,
      isModalOpen: false,
      selectedRow: null,
      columnFilters: {}, // Store filters for each column
    };
  },
  computed: {
    ...mapGetters(["getAllData", "getColumns"]),

    isDataLoaded() {
      return this.getAllData.length > 0;
    },

    // Get unique list of countries
    countryList() {
      return [...new Set(this.getAllData.map((row) => row.country))].sort();
    },

    // All available columns
    allColumns() {
      return this.getColumns;
    },

    // Filtered & Sorted Data
    filteredData() {
      let data = [...this.getAllData];

      // Filter by country
      if (this.selectedCountry) {
        data = data.filter((row) => row.country === this.selectedCountry);
      }

      // Apply column filters
      data = data.filter((row) => {
        return Object.keys(this.columnFilters).every((col) => {
          const filterValue = this.columnFilters[col];
          if (!filterValue) return true; // Skip empty filters
          return String(row[col])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        });
      });

      // Sort data
      if (this.sortKey !== "none") {
        data.sort((a, b) => {
          let valA = a[this.sortKey] ?? "";
          let valB = b[this.sortKey] ?? "";
          valA = parseFloat(valA) || 0;
          valB = parseFloat(valB) || 0;
          return valA > valB ? 1 : valA < valB ? -1 : 0;
        });
      }

      return data;
    },

    // Pagination Logic
    totalPages() {
      return Math.ceil(this.filteredData.length / this.rowsPerPage);
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.rowsPerPage;
      return this.filteredData.slice(start, start + this.rowsPerPage);
    },
  },
  methods: {
    toggleFilter(event) {
      this.showColumnFilter = !this.showColumnFilter;
      if (this.showColumnFilter) {
        this.$nextTick(() => {
          document.addEventListener("click", this.clickOutside);
        });
      } else {
        document.removeEventListener("click", this.clickOutside);
      }
    },
    clickOutside(event) {
      if (
        this.$refs.filterPanel &&
        !this.$refs.filterPanel.contains(event.target) &&
        !event.target.closest(".filter-btn") // Prevent closing when clicking the button
      ) {
        this.showColumnFilter = false;
        document.removeEventListener("click", this.clickOutside);
      }
    },
    getUniqueColumnValues(column) {
      const values = [
        ...new Set(this.getAllData.map((row) => row[column])),
      ].filter(Boolean);
      console.log(`Unique values for ${column}:`, values); // Debugging log
      return values;
    },

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
    animatePageElements() {
      const tl = gsap.timeline();
      tl.from(this.$refs.header, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power4.out",
      });
    },
  },

  mounted() {
    // Trigger animation after the component is mounted
    this.animatePageElements();
    this.selectedColumns = [...this.getColumns];
  },
  beforeUnmount() {
    document.removeEventListener("click", this.clickOutside);
  },
};
</script>

<style scoped>
/* Column Filter Panel */
.column-filter-panel {
  position: absolute;
  background-color: var(--color-primary);
  padding: 1rem;
  z-index: 10;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 70vw;
  max-width: 900px;
  text-align: left;
  border-radius: 1rem;
  right: -200px;
  top: 50px;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
tr:nth-child(even) {
  background-color: #bfced1;
}

/* Table Styling */
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 0.4rem;
  background-color: var(--color-bg-light);
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1280px;
  margin: 0 auto;
}

/* Targeting scrollbar inside `.container` */
.table-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #9dc0c5;
  height: 4px;
  border-radius: 4px;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background-color: #35746b;
  border-radius: 10px;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #0773bb;
  cursor: pointer;
}

.allDataBody {
  text-align: left;
  font-size: 0.8rem;
  padding: 0.8rem 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 160px;
  margin-inline: 3px;
  text-align: center;
  color: var(--color-text-dark);
  cursor: pointer;
}
.allDataBody:hover {
  background-color: #f0f0f0;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 3rem;
}

.pagination button {
  padding: 0.6rem 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: gray;
  cursor: not-allowed;
}
/* Sorting & Country Filter */
.select-sort,
.select-country {
  padding: 0.6rem 0.4rem;
  font-size: 16px;
  background-color: var(--color-brand-light);
  border-radius: 0.4rem;
}
.container-header {
  align-items: left;
  margin-bottom: 10px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0 1rem;
}
.allDataHeader {
  background-color: var(--color-primary);
  text-overflow: ellipsis;
  overflow: hidden;
  min-width: 150px;
}

/* Filter Inputs */
.filter-input,
.filter-dropdown {
  padding: 2px 0.4rem;
  font-size: 14px;
  border-radius: 5px;
  width: 100%;
  background: rgb(36, 36, 36);
}

.filter-input input {
  background: none;
  border: none;
}
.filter-input input :active {
  border: none;
}
.allDataHeader-text {
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: left;
  line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 250px;
  min-width: 160px;
  margin-bottom: 0.4rem;
}
</style>
