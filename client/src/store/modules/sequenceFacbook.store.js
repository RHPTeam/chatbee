import SequenceService from "@/services/modules/sequence.service";
import BlockServices from "@/services/modules/block.service";

const state = {
  statusSqc: "",
  statusItemSqc: "",
  groupSqc: {},
  itemSqc: {}
};
const getters = {
  statusSqc: state => state.statusSqc,
  statusItemSqc: state => state.statusItemSqc,
  groupSqc: state => state.groupSqc,
  itemSqc: state => state.itemSqc
};
const mutations = {
  /******************** CHECK STATUS SEQUENCE *********************/
  sequence_request: state => {
    state.statusSqc = "loading";
  },
  sequence_success: state => {
    state.statusSqc = "success";
  },
  sequence_error: state => {
    state.statusSqc = "error";
  },
  /******************** CHECK STATUS ITEM SEQUENCE *********************/
  sequenceItem_request: state => {
    state.statusItemSqc = "loading";
  },
  sequenceItem_success: state => {
    state.statusItemSqc = "success";
  },
  sequenceItem_error: state => {
    state.statusItemSqc = "error";
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
  getItemSqc: async ({ commit }, payload) => {
    await commit("sequenceItem_request");
    const result = await BlockServices.show(payload);
    await commit("setBlock", result.data.data[0]);
    await commit("sequenceItem_success");
  },
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const resultCreate = await SequenceService.index();
    await commit("setSequence", resultCreate.data.data);
    await commit("sequence_success");
  },
  createItemSequences: async ({ commit }, payload) => {
    await commit("sequenceItem_request");
    await SequenceService.createItemSequence(payload);
    const resultDataItem = await SequenceService.index();
    await commit("setSequence", resultDataItem.data.data);
    await commit("sequenceItem_success");
  },
  updateItemSqc: async ({ commit }, payload) => {
    commit("sequenceItem_request");
    await SequenceService.updateItemSqc(payload);
    const resultUpdate = await BlockServices.index();
    await commit("setBlock", resultUpdate.data.data[0]);
    commit("sequenceItem_success");
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
