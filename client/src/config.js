// src/config.js
const config = {
  API_BASE_URL:
    // import.meta.env.VITE_API_BASE_URL || "https://data-python.onrender.com",
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api/v1",
};

export default config;
