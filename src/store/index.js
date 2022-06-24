import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

// Modules
import app from "./app";
import general from "./general";

import appConfig from "./app-config";
import verticalMenu from "./vertical-menu";

import offers from "./offers";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    general,
    verticalMenu,
    offers,
  },
  strict: process.env.DEV,
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
