import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import Axios from "axios";

import CookieFunction from "@/utils/cookie.util";
import SecureFunction from "@/utils/secure.util";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = CookieFunction.getCookie("sid");
const cfr = CookieFunction.getCookie("cfr");
if (token && cfr) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
  Vue.prototype.$http.defaults.headers.common["cfr"] = cfr;
}

router.beforeEach((to, from, next) => {
  if (CookieFunction.getCookie("sid") && to.path === "/signin") {
    next("/");
  } else if (CookieFunction.getCookie("sid") && to.path === "/signup") {
    next("/");
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    console.log("Run here 0!");
    if (store.getters.isLoggedIn || CookieFunction.getCookie("sid")) {
      next();
      return;
    }
    next("/signin");
  } else if (to.matched.some(record => record.meta.requiredAdmin)) {
    console.log("Run here!");
    if (
      parseInt(
        SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
      ) === 1 ||
      parseInt(
        SecureFunction.decodeRole(CookieFunction.getCookie("cfr"), 10)
      ) === 2
    ) {
      next();
      return;
    }
    next("/");
  } else if (
    store.getters.mailSender == "" &&
    to.path === "/reset-password/step-2"
  ) {
    next("/reset-password");
  } else if (
    store.getters.mailSender == "" &&
    to.path === "/reset-password/step-3"
  ) {
    next("/reset-password");
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
