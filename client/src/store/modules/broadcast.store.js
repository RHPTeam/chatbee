import BroadcastService from "@/services/modules/broadcast.services";
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
  createSchedule: async ({ commit, state }) => {
    commit("broadcast_request");
    const broadcast = state.broadcasts.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen");
    await BroadcastService.createSchedule(broadcast[0]._id);
    const broadcastsResult = await BroadcastService.index();
    commit("setAllBroadcasts", broadcastsResult.data.data);
    commit("broadcast_success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
