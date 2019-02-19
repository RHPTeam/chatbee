import Vue from "vue";
import Vuex from "vuex";

import AccountStore from "./modules/user.store";
import FacebookCookie from "./modules/facebookCookie.store";
import MessageFacebook from "./modules/messageFacebook.store";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        themeName: "light",
        collapseMenu: false
    },
    getters: {
        themeName: state => {
            return state.themeName;
        },
        collapseMenu: state => {
            return state.collapseMenu;
        }
    },
    mutations: {
        changeMenu: (state, payload) => {
            state.collapseMenu = payload;
        }
    },
    actions: {
        changeMenu: ({ commit }, payload) => {
            commit("changeMenu", payload);
        }
    },
    modules: {
        AccountStore,
        FacebookCookie,
        MessageFacebook
    }
});