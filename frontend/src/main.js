import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
store.dispatch('initializeUser');

new Vue({
  router,
  store,
  Swal,
  render: (h) => h(App),
}).$mount("#app");
