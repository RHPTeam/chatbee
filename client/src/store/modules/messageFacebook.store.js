import io from "socket.io-client";
import MessageService from "@/services/modules/message.service";

const state = {
  message: "",
  messageUser: {},
  replyFBAccount: {},
  statusMessage: "",
  socket: io("localhost:8888"),
  userReceiver: {},
};

const getters = {
  messageUser: state => state.messageUser,
  replyFBAccount: state => state.replyFBAccount,
  statusMessage: state => state.statusMessage,
  userReceiver: state => state.userReceiver,
};

const mutations = {
  replyFBAccount: (state, payload) => (state.replyFBAccount = payload),
  set_userReceiver: (state, payload) => (state.userReceiver = payload),
  setMessageInfo: (state, payload) => {state.messageUser = payload},
};

const actions = {
  // get_userReceiver: async ({ commit }, payload) => {},
  getMessageInfo: async  ({commit}, payload) => {
    const result = await MessageService.showMessage(payload)
    await commit("setMessageInfo", result.data.data[0]);
  },
  replyFBAccount: async ({ commit }, payload) => {
    await commit("replyFBAccount", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
