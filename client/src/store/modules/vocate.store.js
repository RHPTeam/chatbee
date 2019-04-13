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
    const dataSender = {
      name: payload.name,
      _friends: payload._friends
    };
    const res = await VocateService.create(dataSender);
    commit("createVocate", res.data.data);

    //update friends
    const result = await FriendsFacebookService.index();
    commit("setAllFriends", result.data.data);

    //update friends in group
    if(payload.gr_id) {
      const groupInfo = await FriendsFacebookService.getGroupByID(payload.gr_id);
      commit("setGroupInfo", groupInfo.data.data);
    }
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
