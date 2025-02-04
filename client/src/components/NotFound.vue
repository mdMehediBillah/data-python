<template>
  <div
    class="flex flex-col items-center justify-center h-screen bg-gray-100 px-6 text-center"
  >
    <!-- Animated 404 -->
    <h1 class="text-9xl font-extrabold text-blue-500 animate-bounce">404</h1>

    <!-- Error Message -->
    <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 mt-4">
      Oops! Page Not Found
    </h2>
    <p class="text-gray-600 mt-2">
      The page you’re looking for doesn’t exist or has been moved.
    </p>

    <!-- Action Button -->
    <router-link
      to="/"
      class="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
    >
      Go Back Home
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NotFoundPage",
};
</script>
