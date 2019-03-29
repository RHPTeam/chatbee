import VocateService from "@/services/modules/vocate.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  allVocates: []
};

const getters = {
  allVocates: state => state.allVocates
};

const mutations = {
  createVocate: (state, payload) => {
    state.allVocates.push(payload);
  },
  getALlVocates: (state, payload) => {
    state.allVocates = payload;
  }
};

const actions = {
  createVocate: async({ commit }, payload) => {
    const res = await VocateService.create(payload);
    commit("createVocate", res.data.data);
    const result = await FriendsFacebookService.index();
    commit("setAllFriends", result.data.data);
  },
  getALlVocates: async ({ commit }) => {
    const res = await VocateService.index();
    await commit("getALlVocates", res.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
