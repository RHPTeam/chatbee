import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

const state = {
  statusBroadcast: "",
  broadcasts: []
};

const getters = {
  statusBroadcast: state => state.statusBroadcast,
  broadcasts: state => state.broadcasts
};

const mutations = {
  broadcast_request: state => {
    state.statusBroadcast = "loading";
  },
  broadcast_success: state => {
    state.statusBroadcast = "success";
  },
  broadcast_error: state => {
    state.statusBroadcast = "error";
  },
  setAllBroadcasts: (state, payload) => {
    state.broadcasts = payload;
  }
};

const actions = {
  getAllBroadcasts: async ({ commit }) => {
    commit("broadcast_request");
    const result = await BroadcastService.index();
    commit("setAllBroadcasts", result.data.data);
    commit("broadcast_success");
  },
  getItemBroadcasts: async ({commit}, payload) => {
    console.log(payload)
    const resultShowData = await BroadcastService.show(payload);
    console.log(resultShowData.data.data[0]);
    commit("setAllBroadcasts", resultShowData.data.data);
 },
  createSchedule: async ({ commit, state }) => {
    commit("broadcast_request");
    const broadcast = state.broadcasts.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    await BroadcastService.createSchedule(broadcast[0]._id);
    const broadcastsResult = await BroadcastService.index();
    commit("setAllBroadcasts", broadcastsResult.data.data);
    commit("broadcast_success");
  },
  createItemSchedule: async ({ commit }, payload) => {
    commit("broadcast_request");
    const dataItem = {
      value: payload.value
    };
    const dataCreate = await BroadcastService.createItem(
      dataItem,
      payload._id,
      payload.type
    );
    commit("setAllBroadcasts", dataCreate.data.data);
    commit("broadcast_success");
  },
  createContentItemSchedule: async ({commit}, payload) => {
  },
  deleteSchedule: async ({ commit }, payload) => {
    commit("broadcast_request");
    const broadcast = state.broadcasts.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    await BroadcastService.deleteSchedule(broadcast[0]._id, payload);
    const result = await BroadcastService.index();
    commit("setAllBroadcasts", result.data.data);
    commit("broadcast_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
