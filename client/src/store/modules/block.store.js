import BlockServices from "@/services/modules/block.service";
import GroupBlockServices from "@/services/modules/groupBlock.service";

const state = {
  groups: [],
  block: {},
};
const getters = {
  groups: state => state.groups,
  block: state => state.block
};
const mutations = {
  /******************** GROUP BLOCKS *********************/
  getGroupBlock: (state, payload) => {
    state.groups = payload;
  },
  /******************** BLOCK *********************/
  getBlock: (state, payload) => {
    state.block = payload;
  }
};
const actions = {
  /******************** GROUP BLOCKS *********************/
  getGroupBlock: async ({ commit }) => {
    const groupBlock = await GroupBlockServices.index();
    await commit("getGroupBlock", groupBlock.data.data);
  },
  /******************** BLOCK *********************/
  getBlock: async ({ commit }, payload) => {
    const result = await BlockServices.show(payload);
    await commit("getBlock", result.data.data[0]);
  },
  createBlock: async ({ commit }, payload) => {
    const block = await BlockServices.create(payload);
    const groups = await GroupBlockServices.index();
    await commit("getGroupBlock", groups.data.data);
    await commit("getBlock", block.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
