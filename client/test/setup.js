import { config } from "@vue/test-utils";
import { expect } from "chai";

// Global setup for Vue Test Utils
config.global.stubs = {
  // Add any global stubs if needed (e.g., if you are using global components like `router-link`)
};
