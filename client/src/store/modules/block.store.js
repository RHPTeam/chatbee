import BlockServices from "@/services/modules/block.service";
import GroupBlockServices from "@/services/modules/groupBlock.service";

const state = {
  status: "",
  groups: [],
  block: {}
};
const getters = {
  status: state => state.status,
  groups: state => state.groups,
  block: state => state.block
};
const mutations = {
  /******************** CHECK STATUS*********************/
  auth_request: state => {
    state.status = "loading";
  },
  auth_request_success: state => {
    state.status = "success";
  },
  auth_error: state => {
    state.status = "error";
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
    await commit("auth_request");
    const result = await BlockServices.show(payload);
    await commit("getBlock", result.data.data[0]);
    await commit("auth_success");
  },
  createBlock: async ({ commit }, payload) => {
    await commit("auth_request");
    const block = await BlockServices.create(payload);
    const groups = await GroupBlockServices.index();
    await commit("getGroupBlock", groups.data.data);
    await commit("getBlock", block.data.data);
    await commit("auth_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
