import io from "socket.io-client";
import MessageService from "@/services/modules/message.service";

const state = {
  statusMessage: "",
  userReceiver: {},
  message: "",
  messageUser: {},
  socket: io("localhost:8888")
};

const getters = {
  statusMessage: state => state.statusMessage,
  userReceiver: state => state.userReceiver,
  messageUser: state => state.messageUser
};

const mutations = {
  set_userReceiver: (state, payload) => (state.userReceiver = payload),
  setMessageInfo: (state, payload) => {state.messageUser = payload}
};

const actions = {
  // get_userReceiver: async ({ commit }, payload) => {},
  getMessageInfo: async  ({commit}, payload) => {
    const result = await MessageService.showMessage(payload)
    await commit("setMessageInfo", result.data.data[0]);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
