import AttributeService from "@/services/modules/attributes.service";

const state = {
  attr: {}
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
  getAttr: ({ commit }) => {
    const resultData = AttributeService.index();
    commit("setAttr", resultData);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
