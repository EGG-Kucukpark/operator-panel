import Vue from "vue";
import { ToastPlugin, ModalPlugin, BootstrapVue } from "bootstrap-vue";
import VueCompositionAPI from "@vue/composition-api";
import axios from "axios";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import * as VueGoogleMaps from "vue2-google-maps";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import GmapCluster from "vue2-google-maps/dist/components/cluster";
import toastBus from "@/eventBus";
import io from "socket.io-client";
import "./global-components";
import "@/libs/portal-vue";
import "@/libs/toastification";

Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBA6gH1LTs7-6RTKi__xXvdaZ4bV78IdOE",
    libraries: "places",
    location: "tr",
  },
});
Vue.use(VueCompositionAPI);

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faUserSecret, faCar } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faUserSecret, faCar);

/* add font awesome icon component */
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("v-select", vSelect);
Vue.component("GmapCluster", GmapCluster);

require("@core/scss/core.scss");
require("@/assets/scss/style.scss");

const socket = io("https://www.turkpark.com.tr:5555/");
axios.defaults.baseURL = "https://www.turkpark.com.tr:2222/";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Method"] = "GET, PUT, POST, DELETE, OPTIONS";

Vue.prototype.$http = axios;
Vue.prototype.$toastBus = toastBus;
Vue.prototype.$socket = socket;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
