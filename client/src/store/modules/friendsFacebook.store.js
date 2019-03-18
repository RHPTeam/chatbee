import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  friendsStatus: "",
  allFriends: []
};
const getters = {
  friendsStatus: state => state.friendsStatus,
  allFriends: state => state.allFriends
};

const mutations = {
  friends_request: state => {
    state.friendsStatus = "loading";
  },
  friends_success: state => {
    state.friendsStatus = "success";
  },
  friends_error: state => {
    state.friendsStatus = "error";
  },
  setAllFriends: (state, payload) => {
    state.allFriends = payload;
  }
};

const actions = {
  getAllFriends: async ({ commit }) => {
    commit("friends_request");
    const result = await FriendsFacebookService.index();
    commit("setAllFriends", result.data.data);
    commit("friends_success");
  },
  getFriendsUser: async ({ commit }, payload) => {
    commit("friends_request");
    const result = await FriendsFacebookService.getFriendsUser(payload);
    commit("setAllFriends", result.data.data);
    commit("friends_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
