import AccountFacebookService from "@/services/modules/accountFacebook.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  accountsFB: [],
  facebookStatus: ""
};
const getters = {
  accountsFB: state => state.accountsFB,
  facebookStatus: state => state.facebookStatus
};

const mutations = {
  facebook_request: state => {
    state.facebookStatus = "loading";
  },
  facebook_success: state => {
    state.facebookStatus = "success";
  },
  facebook_error: state => {
    state.facebookStatus = "error";
  },
  setAccountsFB: (state, payload) => {
    state.accountsFB = payload;
  },

  addNewAccountFacebook: (state, payload) => {
    state.accountsFB.push(payload);
  }
};

const actions = {
  getAccountsFB: async ({ commit }) => {
    commit("facebook_request");
    const accountsFB = await AccountFacebookService.index();
    await commit("setAccountsFB", accountsFB.data.data);
    commit("facebook_success");
  },

  addCookie: async ({ commit }, payload) => {
    commit("facebook_request");
    const dataSender = {
      cookie: payload
    };
    const result = await AccountFacebookService.create(dataSender);
    FriendsFacebookService.create(result.data.data._id);
    await commit("addNewAccountFacebook", result.data.data);
    commit("facebook_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
