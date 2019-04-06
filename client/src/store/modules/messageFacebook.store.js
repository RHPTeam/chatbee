import MessageService from "@/services/modules/message.service";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";

const state = {
  allConversations: [],
  allConversationsAcc: [],
  message: "",
  curConversation: {},
  replyFBAccount: {},
  statusMessage: "",
  receiverFBAccount: {},
  /********** SYSTEM *************/
  isNewConversation: false,
  isFirstTime: false,
  infoReceiverFirstTime: {}
};

const getters = {
  allConversations: state => state.allConversations,
  allConversationsAcc: state => state.allConversationsAcc,
  curConversation: state => state.curConversation,
  replyFBAccount: state => state.replyFBAccount,
  receiverFBAccount: state => state.receiverFBAccount,
  statusMessage: state => state.statusMessage,

  /********** SYSTEM *************/
  isNewConversation: state => state.isNewConversation,
  isFirstTime: state => state.isFirstTime,
  infoReceiverFirstTime: state => state.infoReceiverFirstTime
};

const mutations = {
  replyFBAccount: (state, payload) => (state.replyFBAccount = payload),
  receiverFBAccount: (state, payload) => (state.receiverFBAccount = payload),
  setAllConversationsAcc: (state, payload) =>
    (state.allConversationsAcc = payload),
  setCurConversation: (state, payload) => {
    state.curConversation = payload;
  },
  setSendMessage: (state, payload) => {
    console.log(payload);
    if (state.curConversation.contents === undefined) {
      state.curConversation = {};
      state.curConversation.contents = [];
      state.curConversation.contents.push(payload);
      console.log(state.curConversation);
    } else {
      state.curConversation.contents.push(payload);
    }
  },

  /********** SYSTEM *************/
  setIsNewConversation: (state, payload) => {
    state.isNewConversation = payload;
  },
  setInfoReceiverFirstTime: (state, payload) => {
    state.isFirstTime = true;
    state.infoReceiverFirstTime = payload;
  },
  setRemoveInfoReceiverFirstTime: (state, payload) => {
    state.isFirstTime = false;
    state.infoReceiverFirstTime = payload;
  }
};

const actions = {
  deleteConversation: async ({ commit, state }, payload) => {
    // remove conversation before delete
    const conversationsAccFilter = state.allConversationsAcc.filter(
      conve => conve._id !== payload
    );
    // set list conversations again after remove item
    commit("setAllConversationsAcc", conversationsAccFilter);

    await MessageService.deleteConversation(payload);
    await commit("setCurConversation", {});
    const result = await MessageService.index();
    await commit("setAllConversationsAcc", result.data.data);
  },
  emptyCurConversation: async ({ commit }) => {
    await commit("setCurConversation", []);
  },
  getAllConversationsByAcc: async ({ commit }, payload) => {
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
  pushPreviewMessage: async ({ commit }, payload) => {
    await commit("setSendMessage", payload);
  },
  updateMessage: async ({ commit }, payload) => {
    await commit("setCurConversation", payload);
    const result = await MessageService.getAllConversationsByAcc(
      localStorage.getItem("rid")
    );
    await commit("setAllConversationsAcc", result.data.data);
  },

  /********** SYSTEM *************/
  createNewConversation: async ({ commit }, payload) => {
    commit("setIsNewConversation", payload);
  },
  pushInfoReceiverFirstTime: async ({ commit }, payload) => {
    commit("setInfoReceiverFirstTime", payload);
  },
  pushPreviewConversation: async ({ commit }) => {
    const fakeObject = {
      _id: 1
    };
    commit("setCurConversation", fakeObject);
  },
  removeInfoReceiverFirstTime: async ({ commit }) => {
    console.log("remove!");
    commit("setRemoveInfoReceiverFirstTime", {});
  },
  removeNewConversation: async ({ commit }) => {
    commit("setIsNewConversation", false);
  },
  removePreviewConversation: async ({ commit }) => {
    commit("setCurConversation", {});
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
