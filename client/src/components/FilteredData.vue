<template>
  <div class="pb-40 min-h-[70vh] px-12 py-6">
    <div class="container-header" ref="header">
      <div>
        <h3 class="text-3xl bold">Filtered Data</h3>
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

    <div class="table-wrapper" ref="tableWrapper">
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
          <tr
            v-for="row in paginatedData"
            :key="row.country"
            @click="openDetailModal(row)"
          >
            <td v-for="col in selectedColumns" :key="col" class="allDataBody">
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
import { mapGetters, mapMutations } from "vuex";
import CountryDetailModal from "./CountryDetailModal.vue";

export default {
  components: {
    CountryDetailModal,
  },
  data() {
    return {
      currentPage: 1, // Tracks current page
      rowsPerPage: 10, // Number of rows per page
      isModalOpen: false, // Controls modal visibility
      selectedRow: null, // Stores the selected row data for modal
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
        return this.getSelectedCountry || "All"; // Set default to "All" if empty
      },
      set(value) {
        this.setSelectedCountry(value);
      },
    },

    countryList() {
      return [
        "All",
        ...new Set(this.getAllData.map((row) => row.country)),
      ].sort();
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
/* Pagination Styles */
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
.select-country {
  margin: 10px;
  padding: 0.6rem 0.8rem;
  font-size: 16px;
  background-color: var(--color-brand-light);
  border-radius: 0.4rem;
}
.allDataHeader {
  background-color: var(--color-primary);
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-align: center;
  padding: 0.8rem 1rem;
  max-width: 160px; /* Adjust as needed */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden;
  text-overflow: ellipsis; /* Add "..." for overflow text */
}

.allDataBody {
  text-align: left;
  font-size: 0.9rem;
  padding: 0.4rem;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: var(--color-text-dark);
  cursor: pointer;
}
.allDataBody:hover {
  background-color: #f0f0f0;
}
tr:nth-child(even) {
  background-color: #bfced1;
}
.table-wrapper {
  width: 100%;
  overflow-x: auto;
  padding: 5px;
  background-color: var(--color-bg-light);
  padding: 0.4rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 1280px;
  margin: 0 auto;
}
</style>
