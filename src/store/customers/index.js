import Vue from "vue";

export default {
  state: {
    customers: [],
    customer: null,
  },
  mutations: {
    setCustomers: (state, customers) => (state.customers = customers),
    setCustomer: (state, customer) => (state.customer = customer),
  },
  getters: {
    customers: (state) => state.customers,
    customer: (state) => state.customer,
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
