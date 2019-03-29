import Api from "@/services";

export default {
  index() {
    return Api().get("message");
  },
  showMessage (id) {
    return Api().get(`message?_receiver=${id}`);
  },
  create(fb_id) {
    return Api().post(`facebook/message?_fbId=${fb_id}`);
  }
};
