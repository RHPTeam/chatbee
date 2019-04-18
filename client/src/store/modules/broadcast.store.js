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
  infoGroupFilter: [],
  filterFriendAttribute: [],
  filterFriendCondition: [],
  filterFriendConditionIsNot: []
};

const getters = {
  statusBroadcast: state => state.statusBroadcast,
  statusNow: state => state.statusNow,
  schedules: state => state.schedules,
  itemBroadcasts: state => state.itemBroadcasts,
  now: state => state.now,
  schedule: state => state.schedule,
  listFilter: state => state.listFilter,
  infoGroupFilter: state => state.infoGroupFilter,
  filterFriendAttribute: state => state.filterFriendAttribute,
  filterFriendCondition: state => state.filterFriendCondition,
  filterFriendConditionIsNot: state => state.filterFriendConditionIsNot
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
  /******************** ALL BROADCASTS *********************/
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
  },
  setFilterFriendAttribute: (state, payload) => {
    state.filterFriendAttribute = payload;
  },
  setFilterWithCondition: (state, payload) => {
    state.filterFriendCondition = payload;
  },
  setFilterWithConditionIsNot: (state, payload) => {
    state.filterFriendConditionIsNot = payload;
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
  changeStatusBroadcast: async ({ commit }, payload) => {
    const result = await BroadcastService.changeStatusBroadcast(
      payload.broadId,
      payload.blockId
    );
    commit("setSchedule", result.data.data);
  },
  // Delete item schedule
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
  // delete item subcribe and unsubscribe on schedule
  deleteItemSubcribeScheduleBroadcasts: async ({ commit }, payload) => {
    await BroadcastService.deleteItemSubcribeSchedule(
      payload.bcId,
      payload.blockId,
      payload.contentId,
      payload.sqcId
    );
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  // delete schedule
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
  // Get all block have type equal " Thiet lap bo hen "
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
  // Update Friend when filter attribute or group friend
  updateFriendSchedule: async ({ commit }, payload) => {
    console.log("update friend then filter");
  },
  listFilterGroup: async ({ commit }) => {
    const resultGroup = await FriendsFacebookService.getGroupFriend();
    // console.log(resultGroup.data.data);
    commit("setListFilter", resultGroup.data.data);
  },
  listFilterAttribute: async ({ commit }) => {
    const resultAttr = await AttributeService.index();
    commit("setListFilter", resultAttr.data.data);
  },
  //Get info friend with name segments and update friend to block
  getInfoGroupFriend: async ({ commit }, payload) => {
    const groupInfo = await FriendsFacebookService.getGroupByID(payload.itemId);
    commit("setInfoGroupFilter", groupInfo.data.data);
    // get id friend
    const dataMap = groupInfo.data.data._friends;
    const result = dataMap.map(obj => {
      obj = obj._id;
      return obj;
    });
    const objSender = {
      friendId: result
    };
    // update friend to block
    const resultUpdateFriend = await BroadcastService.addFriendToBroadcasts(
      payload.bcId,
      payload.blockId,
      objSender
    );
    commit("setSchedule", resultUpdateFriend.data.data);
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  //Get info friend with name attribute and update friend to block
  getInfoFriendWithNameAttribute: async ({ commit }, payload) => {
    const dataSender = {
      name: payload.item.name
    };
    const resultFriend = await AttributeService.filterAttrByName(dataSender);
    commit("setFilterFriendAttribute", resultFriend.data.data);
    // update friend to block
    const objUpdate = {
      friendId: payload.item._friends
    };
    const resultUpdateFriend = await BroadcastService.addFriendToBroadcasts(
      payload.bcId,
      payload.blockId,
      objUpdate
    );
    commit("setSchedule", resultUpdateFriend.data.data);
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  //Get info friend with condition is and update friend to block
  getInfoFriendWithConditionIs: async ({ commit }, payload) => {
    const dataSender = {
      name: payload.name,
      value: payload.item.value
    };
    const resultFriend = await AttributeService.filterAtrrConditionIs(
      dataSender
    );
    commit("setFilterWithCondition", resultFriend.data.data);
    // update friend to block
    const objUpdate = {
      friendId: payload.item._friends
    };
    const resultUpdateFriend = await BroadcastService.addFriendToBroadcasts(
      payload.bcId,
      payload.blockId,
      objUpdate
    );
    commit("setSchedule", resultUpdateFriend.data.data);
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  },
  //Get info friend with condition is not and update friend to block
  getInfoFriendWithConditionIsNot: async ({ commit }, payload) => {
    const dataSender = {
      name: payload.name,
      value: payload.item.value
    };
    const resultFriendIsNot = await AttributeService.filterAtrrConditionIsNot(
      dataSender
    );
    commit("setFilterWithConditionIsNot", resultFriendIsNot.data.data);
    // update friend to block
    const objUpdate = {
      friendId: payload.item._friends
    };
    const resultUpdateFriend = await BroadcastService.addFriendToBroadcasts(
      payload.bcId,
      payload.blockId,
      objUpdate
    );
    commit("setSchedule", resultUpdateFriend.data.data);
    const resultShowData = await BroadcastService.showSchedule(
      payload.bcId,
      payload.blockId
    );
    commit("setSchedule", resultShowData.data.data[0]);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
