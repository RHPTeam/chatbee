import GroupBlockServices from "@/services/modules/scriptGroupBlock.services";

const state = {
  groups: {}
};

const getters = {
  groups: state => state.groups
};

const mutations = {
  getGroupBlock: (state, payload) => {
    state.groups = payload;
  }
};

const actions = {
  getGroupBlock: async ({ commit }) => {
    const groupBlock = await GroupBlockServices.index();
    console.log(groupBlock.data.data);
    await commit("getGroupBlock", groupBlock.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
