import { mount } from "@vue/test-utils";
import AllData from "@/components/AllData.vue";
import { createStore } from "vuex";

describe("AllData.vue", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        data: {
          namespaced: true,
          state: { allData: [{ id: 1, country: "USA" }] },
          getters: { getAllData: (state) => state.allData },
        },
      },
    });
  });

  it("renders table with data", () => {
    const wrapper = mount(AllData, { global: { plugins: [store] } });
    expect(wrapper.text()).toContain("USA");
  });
});
