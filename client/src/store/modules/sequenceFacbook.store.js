import SequenceService from "@/services/modules/sequence.service";
import BlockServices from "@/services/modules/block.service";

const state = {
  statusSqc: "",
  groupSqc: {},
  itemSqc: {}
};
const getters = {
  statusSqc: state => state.statusSqc,
  groupSqc: state => state.groupSqc,
  itemSqc: state => state.itemSqc
};
const mutations = {
  /******************** CHECK STATUS*********************/
  sequence_request: state => {
    state.sequenceStatus = "loading";
  },
  sequence_success: state => {
    state.sequenceStatus = "success";
  },
  sequence_error: state => {
    state.sequenceStatus = "error";
  },
  /******************** SEQUENCE *********************/
  setSequence: (state, payload) => {
    state.groupSqc = payload;
  },
  /******************** ITEM SEQUENCE *********************/
  setItemSqc: (state, payload) => {
    state.itemSqc = payload;
  }
};
const actions = {
  getSequence: async ({ commit }) => {
    const result = await SequenceService.index();
    await commit("setSequence", result.data.data);
  },
  getItemSqc: async ({commit}, payload) => {
    await commit("sequence_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data[0]);
    await commit("sequence_success");
  },
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const resultCreate = await SequenceService.index();
    await commit("setSequence", resultCreate.data.data);
    await commit("sequence_success");
  },
  createItemSequences: async ({ commit }, payload) => {
    await commit("sequence_request");
    await SequenceService.createItemSequence(payload);
    const resultDataItem = await SequenceService.index();
    await commit("setSequence", resultDataItem.data.data);
    await commit("sequence_success");
  },
  deteleSequence: async ({ commit }, payload) => {
    await commit("sequence_request");
    await SequenceService.deteleSqc(payload);
    const resultDelete = await SequenceService.index();
    await commit("setSequence", resultDelete.data.data);
    await commit("sequence_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
