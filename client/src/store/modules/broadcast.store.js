import BroadcastService from "@/services/modules/broadcast.service";
import StringFunction from "@/utils/string.util";

const state = {
  statusBroadcast: "",
  statusNow: "",
  broadcasts: [],
  itemBroadcasts: [],
  now: {
    typeBroadCast: "Không có gì",
    blocks: [
      {
        blockId: {
          type: {
            typeContent: "text",
            valueText: "Nothing"
          }
        },
        _friends: [],
        timeSetting: {
          dateMonth: "12",
          hour: "7",
          repeat: {
            typeRepeat: "Moi ngay",
            valueRepeat: ""
          }
        }
      }
    ],
    _account: {
      type: {}
    },
    created_at: {
      type: Date,
      default: Date.now()
    },
    updated_at: Date
  }
};

const getters = {
  statusBroadcast: state => state.statusBroadcast,
  statusNow: state => state.statusNow,
  broadcasts: state => state.broadcasts,
  itemBroadcasts: state => state.itemBroadcasts,
  now: state => state.now
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
  setAllBroadcasts: (state, payload) => {
    state.broadcasts = payload;
  },
  setItemBroadcasts: (state, payload) => {
    state.itemBroadcasts = payload;
  },
  /******************** BROADCASTS NOW *********************/
  setBroadcastsNow: (state, payload) => {
    state.now = payload;
  }
};

const actions = {
  // Lấy dữ liệu broadcasts
  getAllBroadcasts: async ({ commit }) => {
    commit("broadcast_request");
    const result = await BroadcastService.index();
    commit("setAllBroadcasts", result.data.data);
    commit("broadcast_success");
  },
  // Lấy dữ liêu broadcast theo id
  getItemBroadcasts: async ({ commit }, payload) => {
    const resultShowData = await BroadcastService.show(payload);
    commit("setItemBroadcasts", resultShowData.data.data);
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
  createContentItemSchedule: async ({ commit }, payload) => {
    console.log(payload);
    const dataSender = {
      contents: {
        valueText: payload.value,
        typeContent: payload.type
      }
    };
    await BroadcastService.updateBroadcasts(payload.scheduleId, payload.itemId, dataSender);
    const resultData = await BroadcastService.index();
    commit("setAllBroadcasts", resultData.data.data);
  },
  createBroadcastsNow: async ({ commit }, payload) => {
    commit("now_request");
    console.log("fuck you");
    // const dataResult = await this.payload.push()
    commit("now_success");
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
