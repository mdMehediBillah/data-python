import { AllData, FilteredData } from "../components";

export const routes = [
  { path: "/", redirect: "/all-data" },
  { path: "/all-data", component: AllData },
  { path: "/filtered-data", component: FilteredData },
];
