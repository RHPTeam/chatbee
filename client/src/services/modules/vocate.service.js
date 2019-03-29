import Api from "@/services";

export default {
  index() {
    return Api().get("vocate");
  },
  create(data) {
    return Api().post("vocate", data);
  },
  getName(uid) {
    return Api().get(`vocate?_friends=${uid}`);
  }
};
