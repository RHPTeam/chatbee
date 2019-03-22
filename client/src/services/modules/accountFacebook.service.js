import Api from "@/services";

export default {
  index() {
    return Api().get("facebook");
  },
  create(cookie) {
    return Api().post("facebook",cookie);
  },
  delete(fbId) {
    return Api().delete(`facebook?_fbId=${fbId}`);
  }
};
