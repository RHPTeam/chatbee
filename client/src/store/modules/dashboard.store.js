const state = {
  themeName: "light",
  collapseMenu: false,
};
const getters = {
  themeName: state => {
    return state.themeName;
  },
  collapseMenu: state => {
    return state.collapseMenu;
  }
};
const mutations = {
  changeMenu: (state, payload) => {
    state.collapseMenu = payload;
  },
  changeThemeName: (state, payload) => {
    state.themeName = payload;
  }
};
const actions = {
  changeMenu: ({ commit }, payload) => {
    commit("changeMenu", payload);
  },
  changeThemeName: ({commit}, payload) => {
    commit("changeThemeName", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
