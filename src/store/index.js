import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './app'
import general from './general'

import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    general,
    verticalMenu,
  },
  strict: process.env.DEV,
})
