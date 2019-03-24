import AccountFacebookService from "@/services/modules/accountFacebook.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  accountsFB: [],
  facebookStatus: "",
  statusDeleteFacebook: ""
};
const getters = {
  accountsFB: state => state.accountsFB,
  facebookStatus: state => state.facebookStatus,
  statusDeleteFacebook: state => state.statusDeleteFacebook
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
  statusDeleteFacebook_request: state => state.statusDeleteFacebook = "loading",
  statusDeleteFacebook_success: state => state.statusDeleteFacebook = "success",

  addNewAccountFacebook: (state, payload) => {
    state.accountsFB.push(payload);
  }
};

const actions = {
  addCookie: async ({ commit }, payload) => {
    commit("facebook_request");
    const dataSender = {
      cookie: payload
    };
    const result = await AccountFacebookService.create(dataSender);
    FriendsFacebookService.create(result.data.data._id);
    await commit("addNewAccountFacebook", result.data.data);
    commit("facebook_success");
  },
  deleteAccountFacebook: async ({ commit, state }, payload) => {
    commit("statusDeleteFacebook_request");
    state.accountsFB.map((account, index, list) => {
      if (account._id === payload) return list.splice(index, 1)
    });
    await commit("setAccountsFB", state.accountsFB);
    await AccountFacebookService.delete(payload);
    const accountsFB = await AccountFacebookService.index();
    await commit("setAccountsFB", accountsFB.data.data);
    commit("statusDeleteFacebook_success");
  },
  getAccountsFB: async ({ commit }) => {
    commit("facebook_request");
    const accountsFB = await AccountFacebookService.index();
    await commit("setAccountsFB", accountsFB.data.data);
    commit("facebook_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
