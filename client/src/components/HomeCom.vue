<template>
  <div
    class="home-container container mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-24 mb-32"
  >
    <div class="home-text">
      <div>
        <h1
          class="lg:text-[4rem] font-[300] pb-6 md:pb-4 md:text-[3rem] sm:text-[2rem] p-4"
        >
          Good decisions come from good data
        </h1>
        <p>
          Carbon Minds provides the world’s largest environmental life cycle
          database for chemicals and plastics, empowering companies to make
          informed decisions that reduce environmental impacts.
        </p>
      </div>
      <div>
        <router-link to="/all-data" class="nav-button">Take ride</router-link>
      </div>
    </div>
    <div>
      <img
        src="../assets/project-overview.png"
        alt="overview photo"
        class="homePhoto"
      />
    </div>
  </div>
</template>
<style scoped>
.home-container {
  padding: 6rem 0;
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
