import RoleService from "@/services/modules/role.service";

const state = {
  collapseSidebar: false,
  roles: []
};
const getters = {
  collapseSidebar: state => state.collapseSidebar,
  roles: state => state.roles
};
const mutations = {
  changeSidebar: (state, payload) => {
    state.collapseSidebar = payload;
  },
  getRoles: (state, payload) => {
    state.roles = payload;
  }
};
const actions = {
  changeSidebar: ({ commit }, payload) => {
    commit("changeSidebar", payload);
  },
  getRoles: async ({ commit }, payload) => {
    const roles = await RoleService.index();
    await commit("getRoles", roles.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
