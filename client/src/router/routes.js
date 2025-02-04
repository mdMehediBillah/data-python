import {
  AllData,
  FilteredData,
  GraphicalData,
  HomeCom,
  NotFound,
} from "../components";

export const routes = [
  { path: "/", component: HomeCom },
  { path: "/all-data", component: AllData },
  { path: "/filtered-data", component: FilteredData },
  { path: "/graphical-data", component: GraphicalData },
  { path: "/:pathMatch(.*)*", component: NotFound },
];
