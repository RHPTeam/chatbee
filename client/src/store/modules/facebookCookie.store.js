import AccountFacebookService from "@/services/modules/accountFacebook.service";

const state = {
  cookie: "",
};

const getters = {
  cookie: state => state.cookie,
};

const mutations = {
  addCookie: (state, payload) => {
    state.cookie = payload.cookie;
  }
};

const actions = {
  addCookie: async ({ commit }, payload) => {
    const cookie = await AccountFacebookService.create(payload);
    await commit("addCookie", cookie); 
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
