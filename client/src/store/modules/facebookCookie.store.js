import AccountFacebookService from "@/services/modules/accountFacebook.service";

const state = {
  cookie: "",
  userOfCookie: []
};

const getters = {
  cookie: state => state.cookie,
  userOfCookie: state => state.userOfCookie
};

const mutations = {
  addCookie: (sate, payload) => {
    state.cookie = payload.cookie;
    state.userOfCookie.push(payload.userOfCookie);
  }
};

const actions = {
  addCookie: async ({ commit }, payload) => {
    const objSender = {
      cookie: payload.cookie
    };
    const objectResult = await AccountFacebookService.create(
      objSender,
      payload.loginType
    );
    const objectSenderToMuations = {
      cookie: payload.cookie,
      userOfCookie: objectResult.data.data
    };
    commit("addCookie", objectSenderToMuations);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
