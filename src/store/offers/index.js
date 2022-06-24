import Vue from "vue";

export default {
  state: {
    offers: [],
  },
  mutations: {
    setOffers(state, offers) {
      state.offers = offers;
    },
  },
  getters: {
    getAllOffers: (state) => state.offers,
  },
  actions: {
    getOffers({ commit }) {
      Vue.prototype.$http
        .get("/discountOffers")
        .then((response) => {
          commit("setOffers", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    acceptOffer({ dispatch }, offer) {
      Vue.prototype.$http
        .post("/discountOffers/accept", {
          phone: offer.user.phone,
          offeredPrice: offer.offeredPrice,
          user: offer.user,
          location: offer.location.start,
        })
        .then(() => {
          dispatch("getOffers");
          Vue.prototype.$socket.emit("customerLocation");
        })
        .catch((error) => {
          if (error.response.status === 400) {
            Vue.prototype.$toastBus.$emit("Notification", {
              title: "Aktif sürücü bulunamadı.",
              variant: "danger",
            });
          }
        });
    },
    rejectOffer({ dispatch }, offer) {
      Vue.prototype.$http
        .post("/discountOffers/reject", {
          offerId: offer._id,
        })
        .then(() => {
          dispatch("getOffers");
          Vue.prototype.$toastBus.$emit("Notification", {
            title: "Teklif Reddedildi",
            variant: "success",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          Vue.prototype.$toastBus.$emit("Notification", {
            title: "Hata oluştu",
            variant: "danger",
          });
        });
    },
  },
};
