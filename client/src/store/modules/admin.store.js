const state = {
  collapseSidebar: false
};
const getters = {
  collapseSidebar: state => {
    return state.collapseSidebar;
  }
};
const mutations = {
  changeSidebar: (state, payload) => {
    state.collapseSidebar = payload;
  }
};
const actions = {
  changeSidebar: ({ commit }, payload) => {
    commit("changeSidebar", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
