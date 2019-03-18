import AccountFacebookService from "@/services/modules/accountFacebook.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  accountsFB: []
};
const getters = {
  accountsFB: state => state.accountsFB
};

const mutations = {
  setAccountsFB: (state, payload) => {
    state.accountsFB = payload;
  },

  addNewAccountFacebook: (state, payload) => {
    state.accountsFB.push(payload);
  }
};

const actions = {
  getAccountsFB: async ({ commit }) => {
    const accountsFB = await AccountFacebookService.index();
    await commit("setAccountsFB", accountsFB.data.data);
  },

  addCookie: async ({ commit }, payload) => {
    const dataSender = {
      cookie: payload
    };
    const result = await AccountFacebookService.create(dataSender);
    FriendsFacebookService.create(result.data.data._id);
    await commit("addNewAccountFacebook", result.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
