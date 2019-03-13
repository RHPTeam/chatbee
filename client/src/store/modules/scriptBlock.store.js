import BlockServices from "@/services/modules/scriptBlock.service";

const state = {
  blocks: {}
};
const getters = {
  blocks: state => state.blocks
};
const mutations = {
  getBlock: (state,payload) => {
    state.blocks = payload
  }
};
const actions = {
  getBlock: async ({commit}) => {
    const getBlock = await BlockServices.index();
    await commit("getBlock", getBlock.data);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};