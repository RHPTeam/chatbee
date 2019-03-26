import Api from "@/services";

export default {
  index() {
    return Api().get("broadcast");
  },
  createSchedule(sId) {
    return Api().post(`broadcast/addBlock?_bcId=${sId}`);
  },
  createItem(broadId, blockId, item) {
    return Api().patch(
      `broadcast?_broadId=${broadId}&_blockId=${blockId}`,
      item
    );
  },
  showSchedule(broadId, blockId) {
    return Api().get(`broadcast?_id=${broadId}&_blockId=${blockId}`);
  },
  updateBroadcasts(broadId, blockId, broadcast) {
    return Api().patch(
      `broadcast?_bcId=${broadId}&_blockId=${blockId}`,
      broadcast
    );
  },
  deleteSchedule(bId, sId) {
    return Api().delete(`broadcast?_bcId=${bId}&_blockId=${sId}`);
  },
  updateSchedule(bc_id, b_id, type, schedule) {
    return Api().patch(`broadcast?_bcId=${bc_id}&_blockId=${b_id}&_type=${type}`, schedule)
  }
};
