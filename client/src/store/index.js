import Vue from "vue";
import Vuex from "vuex";

import AdminStore from "./modules/admin.store";
import AccountStore from "./modules/user.store";
import FacebookCookie from "./modules/facebookCookie.store";
import MessageFacebook from "./modules/messageFacebook.store";
import FriendsFacebook from "./modules/friendsFacebook.store";
import DashBoard from "./modules/dashboard.store";
import Block from "./modules/block.store";
import Broadcast from "./modules/broadcast.store";
import SequenceFaceBook from "./modules/sequenceFacbook.store";
import Syntax from "./modules/syntax.store";
import Vocate from "./modules/vocate.store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AdminStore,
    AccountStore,
    FacebookCookie,
    MessageFacebook,
    FriendsFacebook,
    DashBoard,
    Block,
    Broadcast,
    SequenceFaceBook,
    Syntax,
    Vocate
  }
});
