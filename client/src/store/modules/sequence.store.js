import SequenceService from "@/services/modules/sequence.service";

const state = {
  sequenceStatus: "",
  sequence: {}
};
const getters = {
  sequenceStatus: state => state.sequenceStatus,
  sequence: state => state.sequence
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
    state.sequence = payload
  }
};
const actions = {
  getSequence: async ({commit}) => {
    const dataSequence = await SequenceService.index();
    await commit("setSequence", dataSequence.data.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
