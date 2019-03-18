import Api from "@/services";

export default {
  index() {
    return Api().get("broadcast");
  },
  createSchedule(bcId) {
    return Api().post(`broadcast/addBlock?_bcId=${bcId}`);
  }
};
