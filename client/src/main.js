import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import Axios from "axios";
import CookieFunction from "@/utils/cookie.util";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = CookieFunction.getCookie("sid");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}

router.beforeEach((to, from, next) => {
  if (CookieFunction.getCookie("sid") && CookieFunction.getCookie("uid") && to.path === "/signin") {
    next("/");
  } else if (CookieFunction.getCookie("sid") && CookieFunction.getCookie("uid") && to.path === "/signup") {
    next("/");
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters.isLoggedIn) {
      next();
    }
    if (CookieFunction.getCookie("sid") && CookieFunction.getCookie("uid")) {
      next();
    }
    next("/signin");
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
