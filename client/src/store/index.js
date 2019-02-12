import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/user.store";
import FacebookCookie from "./modules/facebookCookie.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { AccountStore, FacebookCookie }
});
