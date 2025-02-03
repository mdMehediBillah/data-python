<template>
  <div
    class="home-container container mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center sm:mt-12 mb-32 px-12 min-h-[70vh]"
  >
    <div class="home-text">
      <div>
        <h1 ref="title" class="text-[4rem] font-[300] pb-6 md:pb-4 p-4">
          Good decisions come from good data
        </h1>
        <p ref="description">
          Carbon Minds provides the world’s largest environmental life cycle
          database for chemicals and plastics, empowering companies to make
          informed decisions that reduce environmental impacts.
        </p>
      </div>
      <div ref="ctaButton">
        <router-link to="/all-data" class="nav-button">Take ride</router-link>
      </div>
    </div>
    <div>
      <img
        ref="image"
        src="../assets/project-overview.png"
        alt="overview photo"
        class="homePhoto"
      />
    </div>
  </div>
</template>

<script>
import gsap from "gsap";

export default {
  mounted() {
    this.animateElements();
  },
  methods: {
    animateElements() {
      const tl = gsap.timeline();

      // Title animation: Fade and slide in
      tl.from(this.$refs.title, {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: "power4.out",
      });

      // Description animation: Fade in
      tl.from(
        this.$refs.description,
        { opacity: 0, duration: 0.5, y: 20, ease: "power4.out" },
        "-=0.5"
      );

      // Button animation: Scale and fade in
      tl.from(
        this.$refs.ctaButton,
        {
          opacity: 0,
          scale: 0.2,
          y: 50,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      );

      // Image animation: Slide in from the right
      tl.from(
        this.$refs.image,
        { opacity: 0, x: 50, duration: 0.6, ease: "power4.out" },
        "-=0.5"
      );
    },
  },
};
</script>

<style scoped>
.home-container {
  padding: 2rem 1rem;
}

.home-container h1 {
  font-family: "IBM Plex Sans Thai", serif;
}

.homePhoto {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.nav-button {
  padding: 0.8rem 2rem;
  color: var(--color-text-light);
  border-radius: 1rem;
  border: 2px solid var(--color-bg-light);
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-transform: uppercase;
}

.nav-button:hover {
  background-color: var(--color-primary);
  transform: scale(1.05);
}

.home-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}
</style>
