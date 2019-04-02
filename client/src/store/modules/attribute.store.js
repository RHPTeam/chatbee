import AttributeService from "@/services/modules/attributes.service";
import BlockServices from "@/services/modules/block.service";

const state = {
  attr: []
};
const getters = {
  attr: state => state.attr
};
const mutations = {
  setAttr: (state, payload) => {
    state.attr = payload;
  }
};
const actions = {
  createAttribute: async ({ commit }) => {
    await AttributeService.create();
    const resultAttr = AttributeService.index();
    commit("setAttr", resultAttr);
  },
  getAttr: ({ commit }) => {
    const resultData = AttributeService.index();
    commit("setAttr", resultData);
  },
  updateNameAttribute: async ({ commit }, payload) => {
    const dataSender = {
      name: payload.name
    };
    const resultAttrUpdate = AttributeService.update(
      payload.attrId,
      dataSender
    );
    commit("setAttr", resultAttrUpdate);
    const resultUpdate = await AttributeService.index();
    commit("setAttr", resultUpdate);
  },
  updateValueAttribute: async ({ commit }, payload) => {
    const dataSender = {
      value: payload.value
    };
    const resultAttrUpdate = AttributeService.update(
      payload.attrId,
      dataSender
    );
    commit("setAttr", resultAttrUpdate);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
