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
  setGroupBlock: (state, payload) => {
    state.groups = payload;
  },
  /******************** BLOCK *********************/
  setBlock: (state, payload) => {
    state.block = payload;
  }
};
const actions = {
  /******************** GROUP BLOCKS *********************/
  getGroupBlock: async ({ commit }) => {
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
  },
  createGroupBlock: async ({ commit }) => {
    await commit("block_request");
    await GroupBlockServices.create();
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
    await commit("block_success");
  },
  /******************** BLOCK *********************/
  getBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data[0]);
    await commit("block_success");
  },
  createBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const block = await BlockServices.create(payload);
    const groups = await GroupBlockServices.index();
    await commit("setGroupBlock", groups.data.data);
    await commit("setBlock", block.data.data);
    await commit("block_success");
  },
  createItemBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const itemSender = {
      valueText: payload.value
    };
    const resultItemBlock = await BlockServices.createItemBlock(
      itemSender,
      payload.id,
      payload.type
    );
    await commit("setBlock", resultItemBlock.data.data);
    await commit("block_success");
  },
  updateBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const resultBlock = await BlockServices.update(payload);
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
    await commit("block_success");
  },
  deleteBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const resultDelete = await BlockServices.delete(payload);
    await commit("setBlock", resultDelete.data.data);
    const resultDeleteGroup = await GroupBlockServices.index();
    await commit("setGroupBlock", resultDeleteGroup.data.data);
    await commit("block_success");
  },
  deleteGroup: async ({ commit }, payload) => {
    await commit("block_request");
    await GroupBlockServices.deleteGroup(payload);
    const resultDeleteGroup = await GroupBlockServices.index();
    await commit("setGroupBlock", resultDeleteGroup.data.data);
    await commit("block_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
