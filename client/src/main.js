import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import store from "./store";
import router from "./router"; // Import router from /router/index.js

createApp(App).use(store).use(router).mount("#app");
