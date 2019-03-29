import io from "socket.io-client";
import MessageService from "@/services/modules/message.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  allConversations: [],
  message: "", 
  curConversation: {}, // current conversation info
  replyFBAccount: {}, 
  statusMessage: "",
  socket: io("localhost:8888"),
  receiverFBAccount: {},
};

const getters = {
  allConversations: state => state.allConversations,
  curConversation: state => state.curConversation,
  replyFBAccount: state => state.replyFBAccount,
  receiverFBAccount: state => state.receiverFBAccount,
  statusMessage: state => state.statusMessage,
};

const mutations = {
  replyFBAccount: (state, payload) => (state.replyFBAccount = payload),
  receiverFBAccount: (state, payload) => (state.receiverFBAccount = payload),
  setAllConversations: (state, payload) => (state.allConversations = payload),
  setCurConversation: (state, payload) => {state.curConversation = payload},
};

const actions = {
  getAllConversations: async({ commit }) => {
    const result = await MessageService.index();
    console.log('hú hú');
    console.log(result);
    await commit("setAllConversations", result.data.data);
  },
  deleteConversation: async({ commit }, payload) => {
    // delete
  },
  getCurConversation: async ({commit}, payload) => {
    const result = await MessageService.getConversationById(payload)
    await commit("setCurConversation", result.data.data[0]);
  },
  replyFBAccount: async ({ commit }, payload) => {
    await commit("replyFBAccount", payload);
  },
  receiverFBAccount: async ({ commit }, payload) => {
    const res = await FriendsFacebookService.getFriendByID(payload);
    commit("receiverFBAccount", res.data.data[0]);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
