import Api from "@/services";

export default {
  index() {
    return Api().get("message");
  },
  create(fb_id) {
    return Api().post(`facebook/message?_fbId=${fb_id}`);
  }
};
