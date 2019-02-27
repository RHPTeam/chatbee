import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/user.store";
import FacebookCookie from "./modules/facebookCookie.store";
import MessageFacebook from "./modules/messageFacebook.store";
import DashBoard from "./modules/dashboard.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AccountStore,
    FacebookCookie,
    MessageFacebook,
    DashBoard
  }
});
