
import Api from "@/services";

export default {
  index() {
    return Api().get("broadcast");
  },
  createSchedule(sId) {
    return Api().post(`broadcast/addBlock?_bcId=${sId}`);
  },
  createItem(broadId, blockId, item) {
    return Api().patch(`broadcast?_broadId=${broadId}&_blockId=${blockId}`, item);
  },
  deleteSchedule(bId, sId) {
    return Api().delete(`broadcast?_bcId=${bId}&_blockId=${sId}`);
  }
};