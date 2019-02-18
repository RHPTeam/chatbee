import io from "socket.io-client";

const state = {
  user: "",
  message: "",
  messages: [],
  socket: io("localhost:8888")
};

const getters = {};

const mutations = {};

const actions = {};
export default {
  state,
  getters,
  mutations,
  actions
};
