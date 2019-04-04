import AttributeService from "@/services/modules/attributes.service";

const state = {
  attr: [],
  itemAttr: {},
  statusAttr: ""
};
const getters = {
  attr: state => state.attr,
  itemAttr: state => state.itemAttr,
  statusAttr: state => state.statusAttr
};
const mutations = {
  attr_request: state => {
    state.statusAttr = "loading";
  },
  attr_success: state => {
    state.statusAttr = "success";
  },
  attr_error: state => {
    state.statusAttr = "error";
  },
  setAttr: (state, payload) => {
    state.attr = payload;
  },
  setItemAttr: (state, payload) => {
    state.itemAttr = payload;
  }
};
const actions = {
  createAttribute: async ({ commit }) => {
    await AttributeService.create();
    const resultAttr = AttributeService.index();
    commit("setAttr", resultAttr);
  },
  getAttr: async ({ commit }) => {
    const resultData = await AttributeService.index();
    await commit("setAttr", resultData.data.data);
  },
  getAttrById: async ({ commit }, payload) => {
    commit("attr_request");
    const resultAttr = await AttributeService.show(payload);
    commit("setAttr", resultAttr.data.data);
    commit("attr_success");
  },
  updateAttribute: async ({ commit }, payload) => {
    commit("attr_request");
    const resultAttrUpdate = await AttributeService.update(
      payload._id,
      payload
    );
    commit("setAttr", resultAttrUpdate.data.data);
    const resultUpdate = await AttributeService.index();
    commit("setAttr", resultUpdate.data.data);
    commit("attr_success");
  },
  deleteItemAttribute: async ({ commit }, payload) => {
    commit("attr_request");
    await AttributeService.deleteAttribute(payload);
    const dataDel = await AttributeService.index();
    commit("setAttr", dataDel.data.data);
    commit("attr_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
