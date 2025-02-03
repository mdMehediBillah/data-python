<template>
  <div class="pb-40 min-h-[70vh] px-12 py-6">
    <div class="container-header" ref="header">
      <div>
        <h3 class="text-3xl bold">All Data</h3>
      </div>
      <div class="country-filter-container">
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
    </div>

    <div class="table-wrapper" ref="tableWrapper">
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
    <div class="pagination" ref="pagination">
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
import gsap from "gsap";
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
    animatePageElements() {
      const tl = gsap.timeline();
      // Animate header fade-in
      tl.from(this.$refs.header, {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: "power4.out",
      });
      // Animate the table wrapper element with overlap
      tl.from(
        this.$refs.tableWrapper,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.5"
      );
      tl.from(
        this.$refs.pagination,
        {
          opacity: 0,
          x: 20,
          duration: 0.6,
          ease: "power4.out",
        },
        "-=0.5"
      );
    },
  },
  mounted() {
    // Trigger animation after the component is mounted
    this.animatePageElements();
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
.country-filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
/* Pagination Styling */
.pagination {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-top: 2rem;
  padding-bottom: 3rem;
}

.pagination button {
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: rgb(161, 193, 206);
  cursor: not-allowed;
}

.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 3rem 0 1rem;
}

.allDataHeader {
  background-color: var(--color-primary);
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
  padding: 0.8rem 1rem;
  max-width: 160px;
  line-clamp: 2;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
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
}

.select-country {
  margin: 10px;
  padding: 0.6rem 0.8rem;
  font-size: 16px;
  background-color: var(--color-brand-light);
  border-radius: 0.4rem;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
  /* border: 1px solid #ddd; */
  padding: 5px;
  background-color: var(--color-bg-light);
  padding: 0.4rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1280px;
  margin: 0 auto;
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
  background-color: #bfced1;
}

.select-sort {
  margin-left: 10px;
  padding: 0.6rem 0.8rem;
  font-size: 14px;
  background-color: var(--color-brand-light);
  border-radius: 0.4rem;
}
</style>
