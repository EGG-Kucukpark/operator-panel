export default {
  namespaced: true,
  state: {
    customerPhone: '',
    customerId: '',
  },
  getters: {
    customerPhone: state => state.customerPhone,
    customerId: state => state.customerId,

  },
  mutations: {
    user(state, data) {
      state.customerPhone = data.phone
      state.customerId = data._id
    },

  },
  actions: {},
}
