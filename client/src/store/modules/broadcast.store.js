import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

const state = {
  now: {
    content: [
      {
        typeContent: "text",
        valueText: "Nothing"
      }
    ],
    _friends: [],
    _account: ""
  },
  statusBroadcast: "",
  statusNow: "",
  schedules: [],
  itemBroadcasts: [],
  schedule: {}
};

const getters = {
  statusBroadcast: state => state.statusBroadcast,
  statusNow: state => state.statusNow,
  schedules: state => state.schedules,
  itemBroadcasts: state => state.itemBroadcasts,
  now: state => state.now,
  schedule: state => state.schedule
};

const mutations = {
  /******************** CHECK STATUS BROADCASTS *********************/
  broadcast_request: state => {
    state.statusBroadcast = "loading";
  },
  broadcast_success: state => {
    state.statusBroadcast = "success";
  },
  broadcast_error: state => {
    state.statusBroadcast = "error";
  },
  /******************** CHECK STATUS BROADCASTS *********************/
  /******************** CHECK STATUS BROADCASTS NOW *********************/
  now_request: state => {
    state.statusNow = "loading";
  },
  now_success: state => {
    state.statusNow = "success";
  },
  now_error: state => {
    state.statusNow = "error";
  },
  /********************ALL BROADCASTS *********************/
  setSchedules: (state, payload) => {
    state.schedules = payload;
  },
  setSchedule: (state, payload) => {
    state.schedule = payload;
  },
  /******************** BROADCASTS NOW *********************/
  setBroadcastsNow: (state, payload) => {
    state.now = payload;
  }
};

const actions = {
  getSchedules: async ({ commit }) => {
    commit("broadcast_request");
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    commit("setSchedules", result[0].blocks);
    commit("broadcast_success");
  },
  getSchedule: async ({ commit }, payload) => {
    const resultShowData = await BroadcastService.showSchedule(
      payload.broadId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  createSchedule: async ({ commit }) => {
    commit("broadcast_request");
    // Get all broadcasts
    const broadcasts = await BroadcastService.index();
    // Get schedule with typeBoradcast same "thiet lap bo hen"
    const schedules = broadcasts.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    // Add block to broadcast with id of "thiet lap bo hen"
    await BroadcastService.createSchedule(schedules[0]._id);
    // Get all broadcasts
    const broadcastsUpdated = await BroadcastService.index();
    // Get schedules with typeBroadCast same "thiet lap bo hen"
    const schedulesUpdated = broadcastsUpdated.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    // Set new value for schedules in state by mutations
    commit("setSchedules", schedulesUpdated[0].blocks);
    commit("broadcast_success");
  },
  createContentItemSchedule: async ({ commit }, payload) => {
    const dataSender = {
      contents: {
        valueText: payload.value,
        typeContent: payload.type
      }
    };
    await BroadcastService.updateBroadcasts(
      payload.scheduleId,
      payload.itemId,
      dataSender
    );
    const resultData = await BroadcastService.index();
    commit("setSchedules", resultData.data.data);
  },
  deleteSchedule: async ({ commit }, payload) => {
    commit("broadcast_request");
    const broadcasts = await BroadcastService.index();
    // Get schedule with typeBoradcast same "thiet lap bo hen"
    const schedules = broadcasts.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    await BroadcastService.deleteSchedule(schedules[0]._id, payload);
    const result = await BroadcastService.index();
    commit("setSchedules", result.data.data);
    commit("broadcast_success");
  },
  updateSchedule: async ({ commit }, payload) => {
    const resultSchedule = await BroadcastService.updateSchedule(payload.bc_id, payload.b_id, payload.type);
    commit("setSchedule", resultSchedule.data.data[0]);
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    commit("setSchedules", result[0].blocks);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
