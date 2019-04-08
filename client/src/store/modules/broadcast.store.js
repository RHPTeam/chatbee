import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";
import FriendsFacebookService from "@/services/modules/friendsFacebook.service";
import AttributeService from "@/services/modules/attributes.service";

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
  schedule: {},
  listFilter: [],
  infoGroupFilter: []
};

const getters = {
  statusBroadcast: state => state.statusBroadcast,
  statusNow: state => state.statusNow,
  schedules: state => state.schedules,
  itemBroadcasts: state => state.itemBroadcasts,
  now: state => state.now,
  schedule: state => state.schedule,
  listFilter: state => state.listFilter,
  infoGroupFilter: state => state.infoGroupFilter
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
  },
  setListFilter: (state, payload) => {
    state.listFilter = payload;
  },
  setInfoGroupFilter: (state, payload) => {
    state.infoGroupFilter = payload;
  }
};

const actions = {
  createItemSchedule: async ({ commit }, payload) => {
    await BroadcastService.createItemSchedule(
      payload.scheduleId,
      payload.itemId,
      payload.type
    );
    const resultShowData = await BroadcastService.showSchedule(
      payload.scheduleId,
      payload.itemId
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
  deleteItemSchedule: async ({ commit }, payload) => {
    await BroadcastService.deleteItemSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId
    );
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
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
  getSchedule: async ({ commit }, payload) => {
    const resultShowData = await BroadcastService.showSchedule(
      payload.broadId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
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
  updateItemSchedule: async ({ commit }, payload) => {
    await BroadcastService.updateItemSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId,
      {
        valueText: payload.value
      }
    );
  },
  updateItemImageSchedule: async ({ commit }, payload) => {
    const result = await BroadcastService.updateItemSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId,
      payload.value
    );
    commit("setSchedule", result.data.data);
  },
  updateSchedule: async ({ commit }, payload) => {
    const resultSchedule = await BroadcastService.updateSchedule(
      payload.bc_id,
      payload.b_id,
      payload.type,
      {
        day: payload.value
      }
    );
    commit("setSchedule", resultSchedule.data.data);
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    commit("setSchedules", result[0].blocks);
  },
  updateTimeSchedule: async ({ commit }, payload) => {
    const result = await BroadcastService.updateTimeSchedule(
      payload.bcId,
      payload.blockId,
      {
        hour: payload.value
      }
    );
    commit("setSchedule", result.data.data);
    let results = await BroadcastService.index();
    results = results.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    commit("setSchedules", results[0].blocks);
  },
  updateDateSchedule: async ({ commit }, payload) => {
    const result = await BroadcastService.updateTimeSchedule(
      payload.bcId,
      payload.blockId,
      {
        dateMonth: payload.value
      }
    );
    commit("setSchedule", result.data.data);
    let results = await BroadcastService.index();
    results = results.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    commit("setSchedules", results[0].blocks);
  },
  listFilterGroup: async ({ commit }) => {
    const resultGroup = await FriendsFacebookService.getGroupFriend();
    commit("setListFilter", resultGroup.data.data);
  },
  listFilterAttribute: async ({ commit }) => {
    const resultAttr = await AttributeService.index();
    commit("setListFilter", resultAttr.data.data);
  },
  getInfoGroupFriend: async ( {commit}, payload ) => {
    const groupInfo = await FriendsFacebookService.getGroupByID(payload);
    commit("setInfoGroupFilter", groupInfo.data.data[0]);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
