import BlockServices from "@/services/modules/block.service";
import GroupBlockServices from "@/services/modules/groupBlock.service";

const state = {
  statusBlocks: "",
  groups: [],
  block: {}
};
const getters = {
  statusBlocks: state => state.statusBlocks,
  groups: state => state.groups,
  block: state => state.block
};
const mutations = {
  /******************** CHECK STATUS*********************/
  block_request: state => {
    state.statusBlocks = "loading";
  },
  block_success: state => {
    state.statusBlocks = "success";
  },
  block_error: state => {
    state.statusBlocks = "error";
  },
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
    await commit("block_request");
    const result = await BlockServices.show(payload);
    await commit("getBlock", result.data.data[0]);
    await commit("block_success");
  },
  createBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const block = await BlockServices.create(payload);
    const groups = await GroupBlockServices.index();
    await commit("getGroupBlock", groups.data.data);
    await commit("getBlock", block.data.data);
    await commit("block_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
