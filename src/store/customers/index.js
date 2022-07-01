import Vue from "vue";

export default {
  state: {
    customers: [],
  },
  mutations: {
    setCustomers: (state, customers) => (state.customers = customers),
  },
  getters: {
    customers: (state) => state.customers,
  },
  actions: {
    getCustomers({ commit }) {
      Vue.prototype.$http
        .get("/webUsers")
        .then((response) => {
          commit("setCustomers", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newCustomer({ state }, customer) {
      state.customers.push(customer);
    },
  },
};
