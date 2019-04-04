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
  isNewConversation: false
};

const getters = {
  allConversations: state => state.allConversations,
  allConversationsAcc: state => state.allConversationsAcc,
  curConversation: state => state.curConversation,
  replyFBAccount: state => state.replyFBAccount,
  receiverFBAccount: state => state.receiverFBAccount,
  statusMessage: state => state.statusMessage,

  /********** SYSTEM *************/
  isNewConversation: state => state.isNewConversation
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
    console.log(payload)
    if (state.curConversation.contents === undefined) {
      state.curConversation = {}
      state.curConversation.contents = [];
      state.curConversation.contents.push(payload);
      console.log(state.curConversation)
    } else {
      state.curConversation.contents.push(payload);
    }
  },

  /********** SYSTEM *************/
  setIsNewConversation: (state, payload) => {
    state.isNewConversation = payload;
  }
};

const actions = {
  deleteConversation: async ({ commit }, payload) => {
    // remove conversation before delete
    const conversationsAccFilter = state.allConversationsAcc.filter(
      conve => conve._id !== payload
    );
    // set list conversations again after remove item
    commit("setAllConversationsAcc", conversationsAccFilter);

    await MessageService.deleteConversation(payload);

    const replyID = state.replyFBAccount._id;
    const result = await MessageService.getAllConversationsByAcc(replyID);
    await commit("setAllConversationsAcc", result.data.data);

    const len = result.data.data.length;
    const curConve = result.data.data[len - 1];
    console.log(curConve);
    await commit("setCurConversation", curConve);

    const receiver = curConve._receiver;
    commit("receiverFBAccount", receiver);
  },
  emptyCurConversation: async ({ commit }) => {
    await commit("setCurConversation", []);
  },
  getAllConversationsByAcc: async ({ commit }, payload) => {
    const result = await MessageService.getAllConversationsByAcc(payload);
    console.log(result);
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
    console.log(payload)
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
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
