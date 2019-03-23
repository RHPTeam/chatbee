import FriendsFacebookService from "@/services/modules/friendsFacebook.service";
import MessageService from "@/services/modules/message.service";

const state = {
  friendsStatus: "",
  allFriends: [],
  groupFriend: [],
  groupInfo: {},
  selectedUIDs: [],
  facebookInfo: {}
};
const getters = {
  allFriends: state => state.allFriends,
  facebookInfo: state => state.facebookInfo,
  friendsStatus: state => state.friendsStatus,
  groupFriend: state => state.groupFriend,
  groupInfo: state => state.groupInfo,
  selectedUIDs: state => state.selectedUIDs
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
  set_facebookInfo: (state, payload) => (state.facebookInfo = payload),
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
  createGroupByName: async ({commit}, payload) => {
    const result = await FriendsFacebookService.createGroupByName(payload);
    await commit("createGroup", result.data.data);
  },
  updateGroup: async ({commit}, payload) => {
    const result = await FriendsFacebookService.updateGroup(payload);
    await commit("setGroupInfo", result.data.data);
    const groupFriend = await FriendsFacebookService.getGroupFriend();
    commit("setGroupFriend", groupFriend.data.data);
  },
  addFriendsToGroup: async ({commit}, payload) => {
    const result = await FriendsFacebookService.addFriendsToGroup(payload)
    await commit("setGroupInfo", result.data.data);
  },
  deleteFriendsFromGroup: async ({ commit }, payload) => {
    const result = await FriendsFacebookService.deleteFriendsFromGroup(payload);
    await commit("setGroupInfo", result.data.data);
  },
  deleteGroup: async ({commit}, payload) => {
    await FriendsFacebookService.deleteGroup(payload);
    const groupFriend = await FriendsFacebookService.getGroupFriend();
    commit("setGroupFriend", groupFriend.data.data);
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
  },
  getFacebookInfo: async ({ commit }, payload) => {
    const friend = await FriendsFacebookService.getFriendByID(payload);
    commit("set_facebookInfo", friend.data.data[0])
    MessageService.create(payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
