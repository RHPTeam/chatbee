import MessageService from "@/services/modules/message.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  allConversations: [],
  allConversationsAcc: [],
  message: "",
  curConversation: {},
  replyFBAccount: {},
  statusMessage: "",
  receiverFBAccount: {}
};

const getters = {
  allConversations: state => state.allConversations,
  allConversationsAcc: state => state.allConversationsAcc,
  curConversation: state => state.curConversation,
  replyFBAccount: state => state.replyFBAccount,
  receiverFBAccount: state => state.receiverFBAccount,
  statusMessage: state => state.statusMessage
};

const mutations = {
  replyFBAccount: (state, payload) => (state.replyFBAccount = payload),
  receiverFBAccount: (state, payload) => (state.receiverFBAccount = payload),
  setAllConversations: (state, payload) => (state.allConversations = payload),
  setAllConversationsAcc: (state, payload) =>
    (state.allConversationsAcc = payload),
  setCurConversation: (state, payload) => {
    state.curConversation = payload;
  }
};

const actions = {
  deleteConversation: async ({ commit }, payload) => {
    // delete
  },
  emptyCurConversation: async ({ commit }) => {
    await commit("setCurConversation", []);
  },
  getAllConversations: async ({ commit }) => {
    const result = await MessageService.server();
    await commit("setAllConversations", result.data.data);
  },
  getAllConversationsByAcc: async ({ commit }, payload) => {
    console.log(payload)
    const result = await MessageService.getAllConversationsByAcc(payload);
    await commit("setAllConversationsAcc", result.data.data);
  },
  getCurConversation: async ({ commit }, payload) => {
    const result = await MessageService.getConversationById(payload);
    await commit("setCurConversation", result.data.data[0]);
  },
  replyFBAccount: async ({ commit }, payload) => {
    await commit("replyFBAccount", payload);
  },
  receiverFBAccount: async ({ commit }, payload) => {
    const res = await FriendsFacebookService.getFriendByID(payload);
    commit("receiverFBAccount", res.data.data[0]);
  },
  pushMessage: async ({ commit }, payload) => {
    commit("setCurConversation", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
