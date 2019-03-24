import VocateService from "@/services/modules/vocate.service";

const state = {
  allVocates: [],
};

const getters = {
  allVocates: state => state.allVocates,
};

const mutations = {
  getALlVocates: (state, payload) => {
    state.allVocates = payload;
  },
  createVocate: (state, payload) => {
    state.allVocates.push(payload);
  }
};

const actions = {
  getALlVocates: async ({ commit }) => {
    const res = await VocateService.index();
    await commit("getALlVocates", res.data.data);
  },
  createVocate: async({commit}, payload) => {
    const res = await VocateService.create(payload);
    commit("createVocate", res.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
