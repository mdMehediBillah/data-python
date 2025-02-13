<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop ref="modalContainer">
      <h3>Details for {{ countryData?.country }}</h3>
      <div v-for="(value, key) in countryData" :key="key" class="detail-row">
        <strong>{{ key }}:</strong> {{ value }}
      </div>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  props: {
    isOpen: Boolean, // Controls modal visibility
    countryData: Object, // Data for the selected row
  },
  methods: {
    closeModal() {
      this.$emit("close"); // Emit event to parent to close modal
      // Optionally, add animation on close (if needed)
      gsap.to(this.$refs.modalContainer, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "power4.out",
      });
    },
    animatePageElements() {
      const tl = gsap.timeline();
      tl.from(this.$refs.modalContainer, {
        opacity: 0,
        scale: 0.5,
        duration: 1,
        ease: "power4.out",
      });
    },
  },
 watch: {
    isOpen(newValue) {
      if (newValue) {
        document.body.style.overflow = "hidden"; // Disable scrolling
        this.animatePageElements();
      } else {
        document.body.style.overflow = ""; // Restore scrolling
      }
    },
  },
};
</script>

<style scoped>
/* 🟣 Modal Overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Dark transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* ⚪ Modal Content */
.modal-content {
  background-color: var(--color-bg-light);
  color: var(--color-text-dark);
  text-align: left;
  width: 90%; /* Adjust width */
  max-width: 1400px; /* Limit maximum width */
  max-height: 90vh; /* Ensures it doesn't exceed viewport */
  overflow-y: auto; /* Enables vertical scrolling */
  border-radius: 0.8rem;
  padding: 1.4rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.modal-content::-webkit-scrollbar {
  width: 10px;
}

.modal-content::-webkit-scrollbar-track {
  background: #e0e0e0; /* Softer background */
  border-radius: 5px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #0773bb, #35746b); /* Cool gradient */
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #055d8a, #245a48);
}

/* 🟡 Header Text */
.modal-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 0.4rem 1rem;
  color: var(--color-brand);
  width: 100%;
  margin: 0 auto;
  border-bottom: 2px solid #0543a0;
  margin-bottom: 1.4rem;
}

/* 🔵 Detail Row (Label + Content) */
.detail-row {
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 1rem;
}

/* 🔹 Label Styling */
.detail-row strong {
  color: #34495e;
  font-weight: 600;
  min-width: 150px;
}

/* 🔸 Content Styling */
.detail-row span {
  flex: 1;
  text-align: left;
  color: #555;
}

/* 🟥 Close Button */
.close-button {
  display: block;
  width: 100%;
  background-color: var(--color-cta);
  color: var(--color-bg-light);
  border: none;
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 15px;
}

.close-button:hover {
  background-color: #c0392b;
}
</style>
