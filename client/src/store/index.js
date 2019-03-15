import Vue from "vue";
import Vuex from "vuex";

import AdminStore from "./modules/admin.store";
import AccountStore from "./modules/user.store";
import FacebookCookie from "./modules/facebookCookie.store";
import MessageFacebook from "./modules/messageFacebook.store";
import DashBoard from "./modules/dashboard.store";
import Block from "./modules/blocks.store";
import Sequence from "./modules/sequence.store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AdminStore,
    AccountStore,
    FacebookCookie,
    MessageFacebook,
    DashBoard,
    Block,
    Sequence
  }
});
