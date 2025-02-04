import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { routes } from "./routes"; // Import routes

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHashHistory(),
  routes,
});

export default router;
