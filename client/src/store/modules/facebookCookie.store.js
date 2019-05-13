import AccountFacebookService from "@/services/modules/accountFacebook.service";

const state = {
  addAccountError: "",
  accountsFB: [],
  facebookStatus: "",
  statusDeleteFacebook: ""
};
const getters = {
  addAccountError: state => state.addAccountError,
  accountsFB: state => state.accountsFB,
  facebookStatus: state => state.facebookStatus,
  statusDeleteFacebook: state => state.statusDeleteFacebook
};

const mutations = {
  addAccountError: (state, payload) => {
    state.addAccountError = payload;
  },
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
  statusDeleteFacebook_request: state =>
    (state.statusDeleteFacebook = "loading"),
  statusDeleteFacebook_success: state =>
    (state.statusDeleteFacebook = "success"),

  addNewAccountFacebook: (state, payload) => {
    state.accountsFB.push(payload);
  }
};

const actions = {
  addCookie: async ({ commit }, payload) => {
    try {
      commit("facebook_request");
      const dataSender = {
        cookie: payload
      };
      const result = await AccountFacebookService.create(dataSender);
      await commit("addNewAccountFacebook", result.data.data);
      commit("facebook_success");
    } catch (e) {
      if (e.response.status === 403) commit("addAccountError", "error");
      commit("facebook_success");
    }
  },
  deleteAccountFacebook: async ({ commit, state }, payload) => {
    commit("statusDeleteFacebook_request");
    state.accountsFB.map((account, index, list) => {
      if (account._id === payload) return list.splice(index, 1);
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
  },
  setAddAccountErrorEmpty: async ({ commit }) => {
    commit("addAccountError", "");
  },
  updateFacebook: async ({ commit }, payload) => {
    try {
      commit("facebook_request");
      console.log(payload);
      const dataSender = {
        cookie: payload.cookie
      };
      await AccountFacebookService.update(payload.fbId , dataSender);
      const result = await AccountFacebookService.index();
      await commit("addNewAccountFacebook", result.data.data);
      commit("facebook_success");

    } catch (e) {
      if (e.response.status === 403) commit("addAccountError", "error");
      commit("facebook_success");
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
