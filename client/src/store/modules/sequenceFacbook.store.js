import SequenceService from "@/services/modules/sequence.service";

const state = {
  statusSqc: "",
  groupSqc: {}
};
const getters = {
  statusSqc: state => state.statusSqc,
  groupSqc: state => state.groupSqc
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
  }
};
const actions = {
  getSequence: async ({ commit }) => {
    const result = await SequenceService.index();
    await commit("setSequence", result.data.data);
  },
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const resultCreate = await SequenceService.index();
    await commit("setSequence", resultCreate.data.data);
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
