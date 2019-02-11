import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/user.store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { AccountStore }
});
