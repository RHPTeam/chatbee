import SequenceService from "@/services/modules/sequence.service";

const state = {
  sequenceStatus: "",
  sequence: [],
  sequenceItem: {}
};
const getters = {
  sequenceStatus: state => state.sequenceStatus,
  sequence: state => state.sequence,
  sequenceItem: state => state.sequenceItem
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
  /******************** ITEM SEQUENCE *********************/
  setItemSequence: (state, payload) => {
    state.sequenceItem = payload;
  },
  /******************** SEQUENCE *********************/
  setSequence: (state, payload) => {
    state.sequence = payload;
  }
};
const actions = {
  getSequence: async ({ commit }) => {
    const dataSequence = await SequenceService.index();
    console.log(dataSequence.data.data);
    await commit("setSequence", dataSequence.data.data);
  },
  getItemSequence: async ({ commit }) => {
    const dataItem = await SequenceService.show();
    await commit("setItemSequence", dataItem.data.data);
  },
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const result = await SequenceService.index();
    await commit("setSequence", result.data.data);
    await commit("sequence_success");
  }
  // updateSequence: async ({commit}, payload) => {
  //   await commit("sequence_request");
  //   const dataSender = {
  //     name: payload.value
  //   }
  //   const dataResult = await SequenceService.update(dataSender, payload.id);
  //   await commit("setSequence", dataResult.data.data);
  //   await commit("sequence_success");
  // }
};
export default {
  state,
  getters,
  mutations,
  actions
};
