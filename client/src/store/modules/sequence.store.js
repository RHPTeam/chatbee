import SequenceService from "@/services/modules/sequence.service";

const state = {
  sequenceStatus: "",
  groupSqc: [],
  itemSqc: {}
};
const getters = {
  sequenceStatus: state => state.sequenceStatus,
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
  /******************** ITEM SEQUENCE *********************/
  // setItemSequence: (state, payload) => {
  //   state.sequenceItem = payload;
  // },
  /******************** SEQUENCE *********************/
  setGroupSequence: (state, payload) => {
    state.groupSqc = payload;
  }
};
const actions = {
  getGroupSequence: async ({ commit }) => {
    console.log("Run here!");
    const result = await SequenceService.index();
    console.log(result);
    await commit("setGroupSequence", result);
  },
  // getGroupSequence: async ({ commit }) => {
  //   const result = await SequenceService.index();
  //   await commit("setGroupSequence", result.data.data);
  // }
  // getItemSequence: async ({ commit }) => {
  //   const dataItem = await SequenceService.show();
  //   await commit("setItemSequence", dataItem.data.data);
  // },
  createSequence: async ({ commit }) => {
    await commit("sequence_request");
    await SequenceService.create();
    const resultData = await SequenceService.index();
    await commit("setSequence", resultData.data.data);
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
