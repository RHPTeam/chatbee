import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./routes";
import Axios from "axios";

import CookieFunction from "@/utils/cookie.util";
import SecureFunction from "@/utils/secure.util";

import Editable from "@/components/shared/editable";
import LoadingComponent from "@/components/shared/cp_loading";

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;

const token = CookieFunction.getCookie("sid");
const cfr = CookieFunction.getCookie("cfr");
if (token && cfr) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
  Vue.prototype.$http.defaults.headers.common["cfr"] = cfr;
}

/********************* SECURED ROUTER ************************/
router.beforeEach((to, from, next) => {
  if (CookieFunction.getCookie("sid") && to.path === "/signin") {
    next("/");
  } else if (CookieFunction.getCookie("sid") && to.path === "/signup") {
    next("/");
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    if (store.getters.isLoggedIn || CookieFunction.getCookie("sid")) {
      next();
      return;
    }
    next("/signin");
  } else if (to.matched.some(record => record.meta.requiredAdmin)) {
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

/********************* CUSTOM LIBRARY DIRECTIVE ************************/
Vue.directive("click-outside", {
  bind: function(el, binding, vNode) {
    // Provided expression must evaluate to a function.
    if (typeof binding.value !== "function") {
      const compName = vNode.context.name;
      let warn = `[Vue-click-outside:] provided expression '${
        binding.expression
      }' is not a function, but has to be`;
      if (compName) {
        warn += `Found in component '${compName}'`;
      }

      console.warn(warn);
    }
    const bubble = binding.modifiers.bubble;
    const handler = e => {
      if (bubble || (!el.contains(e.target) && el !== e.target)) {
        binding.value(e);
      }
    };
    el.__vueClickOutside__ = handler;

    document.addEventListener("click", handler);
  },

  unbind: function(el) {
    document.removeEventListener("click", el.__vueClickOutside__);
    el.__vueClickOutside__ = null;
  }
});

/********************* CUSTOM GLOBAL COMPONENT EDITABLE ************************/
Vue.component("editable", Editable);
Vue.component("loading-component", LoadingComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
