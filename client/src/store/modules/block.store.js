import BlockServices from "@/services/modules/block.service";
import GroupBlockServices from "@/services/modules/groupBlock.service";

const state = {
  statusGroupBlocks: "",
  statusBlocks: "",
  groups: [],
  block: {},
  blocks: []
};
const getters = {
  statusGroupBlocks: state => state.statusGroupBlocks,
  statusBlocks: state => state.statusBlocks,
  groups: state => state.groups,
  block: state => state.block,
  blocks: state => state.blocks
};
const mutations = {
  /******************** CHECK STATUS GROUP BLOCK *********************/
  groupBlock_request: state => {
    state.statusGroupBlocks = "loading";
  },
  groupBlock_success: state => {
    state.statusGroupBlocks = "success";
  },
  groupBlock_error: state => {
    state.statusGroupBlocks = "error";
  },
  /******************** CHECK STATUS BLOCK *********************/
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
  },
  setBlocks: (state, payload) => {
    state.blocks = payload;
  }
};
const actions = {
  /******************** GROUP BLOCKS *********************/
  createGroupBlock: async ({ commit }) => {
    await commit("groupBlock_request");
    await GroupBlockServices.create();
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
    await commit("groupBlock_success");
  },
  deleteGroup: async ({ commit }, payload) => {
    await commit("groupBlock_request");
    await GroupBlockServices.deleteGroup(payload);
    const resultDeleteGroup = await GroupBlockServices.index();
    await commit("setGroupBlock", resultDeleteGroup.data.data);
    await commit("groupBlock_success");
  },
  getBlocks: async ({ commit }) => {
    const results = await BlockServices.index();
    commit("setBlocks", results.data.data);
  },
  getGroupBlock: async ({ commit }) => {
    await commit("groupBlock_request");
    const groupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", groupBlock.data.data);
    await commit("groupBlock_success");
  },
  updateGroupBlock: async ({ commit }, payload) => {
    await GroupBlockServices.updateGroupBlock(payload.gr_id, {
      name: payload.name
    });
  },
  /******************** BLOCK *********************/
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
  deleteBlock: async ({ commit }, payload) => {
    await commit("block_request");
    await BlockServices.delete(payload);
    const resultDelBlock = await BlockServices.index();
    await commit("setBlock", resultDelBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
    await commit("block_success");
  },
  deleteItemBlock: async ({ commit }, payload) => {
    await commit("block_request");
    await BlockServices.deleteItemBlock(payload.blockId, payload.itemId);
    const resultDelItem = await BlockServices.index();
    await commit("setBlock", resultDelItem.data.data);
    const resultDataUpdate = await BlockServices.show(payload.blockId);
    commit("setBlock", resultDataUpdate.data.data[0]);
    await commit("block_success");
  },
  getBlock: async ({ commit }, payload) => {
    await commit("block_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data[0]);
    await commit("block_success");
  },
  updateBlock: async ({ commit }, payload) => {
    const resultBlock = await BlockServices.update(payload);
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  },
  updateItemBlock: async ({ commit }, payload) => {
    const objSender = {
      valueText: payload.valueText,
      typeContent: payload.type
    };
    const resultBlock = await BlockServices.updateItemBlock(
      objSender,
      payload.itemId,
      payload.block
    );
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  },
  updateItemImageBlock: async ({ commit }, payload) => {
    const resultBlock = await BlockServices.updateItemBlock(
      payload.formData,
      payload.id,
      payload.block
    );
    await commit("setBlock", resultBlock.data.data);
    const resultGroupBlock = await GroupBlockServices.index();
    await commit("setGroupBlock", resultGroupBlock.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
