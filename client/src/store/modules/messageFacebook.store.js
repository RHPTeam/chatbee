import io from "socket.io-client";

const state = {
  userReceiver: {},
  message: "",
  messages: [],
  socket: io("localhost:8888")
};

const getters = {
  userReceiver: state => state.userReceiver
};

const mutations = {
  set_userReceiver: (state, payload) => state.userReceiver = payload
};

const actions = {
  get_userReceiver: async ({ commit }, payload) => {

  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
