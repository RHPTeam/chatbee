
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
  show (broadId) {
    return Api().get(`broadcast?_broadId=${broadId}`);
  },
  update () {
    return Api().post();
  },
  deleteSchedule(bId, sId) {
    return Api().delete(`broadcast?_bcId=${bId}&_blockId=${sId}`);
  }
};