import { createStore } from "vuex";
import { expect } from "chai";

const store = createStore({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

describe("Vuex Store", () => {
  it("increments state count", () => {
    store.commit("increment");
    expect(store.state.count).to.equal(1);
  });
});

// test/store/data.spec.js

// import { expect } from "chai";
// import { createStore } from "vuex";
// import axios from "axios";
// import sinon from "sinon";
// import store from "../../src/store/index.js";
// import * as analytics from "../../src/store/analytics.js";

// describe("Vuex Store - Data Module", () => {
//   let axiosGetStub;

//   beforeEach(() => {
//     // Stub the axios GET method
//     axiosGetStub = sinon.stub(axios, "get").resolves({
//       data: {
//         /* mock data */
//       },
//     });

//     // Stub analytics module to avoid side effects
//     sinon.stub(analytics, "default").value({});

//     // Reset the store's state before each test
//     store.replaceState({
//       data: {
//         allData: [],
//         data: [],
//         filteredData: [],
//         columns: [],
//         countries: [],
//         selectedCountry: "",
//         selectedRow: null,
//         sortOrder: "asc",
//         loading: false,
//       },
//     });
//   });

//   afterEach(() => {
//     sinon.restore(); // Restore all stubs (axios and analytics)
//   });

//   it("should initialize with empty data", () => {
//     expect(store.state.data.allData).to.deep.equal([]);
//   });

//   it("should fetch and store data", async () => {
//     const mockData = {
//       data: {
//         data: [{ id: 1, country: "USA", carbonContent: 50 }],
//         columns: ["id", "country", "carbonContent"],
//       },
//     };

//     // Stub the GET request to return mock data
//     axiosGetStub.resolves(mockData);

//     // Dispatch the action to fetch data
//     await store.dispatch("data/fetchData");

//     // Ensure the data is correctly stored in Vuex
//     expect(store.state.data.allData).to.deep.equal(mockData.data.data);
//   });
// });
