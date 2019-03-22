import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  friendsStatus: "",
  allFriends: [],
  groupFriend: [],
  groupInfo: {},
  selectedUIDs: []
};
const getters = {
  groupFriend: state => state.groupFriend,
  groupInfo: state => state.groupInfo,
  selectedUIDs: state => state.selectedUIDs,

  friendsStatus: state => state.friendsStatus,
  allFriends: state => state.allFriends
};

const mutations = {
  //***************GROUP FRIEND*******************//
  setGroupFriend: (state, payload) => {
    state.groupFriend = payload;
  },
  setGroupInfo: (state, payload) => {
    state.groupInfo = payload;
  },
  createGroup: (state, payload) => {
    state.groupFriend.push(payload);
  },
  selectedUIDs: (state, payload) => {
    state.selectedUIDs = payload;
  },

  //***************FRIEND*******************//
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
  //***************GROUP FRIEND*******************//
  getGroupFriend: async ({ commit }) => {
    const groupFriend = await FriendsFacebookService.getGroupFriend();
    commit("setGroupFriend", groupFriend.data.data);
  },
  getGroupByID: async ({ commit }, payload) => {
    const groupInfo = await FriendsFacebookService.getGroupByID(payload);
    commit("setGroupInfo", groupInfo.data.data[0]);
  },
  createGroup: async ({ commit }) => {
    const result = await FriendsFacebookService.createGroup();
    await commit("createGroup", result.data.data);
  },
  deleteFriendsFromGroup: async ({commit}, payload) => {
    const result = await FriendsFacebookService.deleteFriendsFromGroup(payload);
    await commit("setGroupInfo", result.data.data);
  },
  selectedUIDs: ({ commit }, payload) => {
    commit("selectedUIDs", payload);
  },

  //***************FRIEND*******************//
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
