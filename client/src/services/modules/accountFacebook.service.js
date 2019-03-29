import Api from "@/services";

export default {
  index() {
    return Api().get("facebook");
  },
  create(cookie) {
    return Api().post("facebook", cookie);
  },
  delete(fbId) {
    return Api().delete(`facebook?_fbId=${fbId}`);
  },
  getFBAccountById(id) {
    return Api().get(`facebook?_id=${id}`);
  },
  login(fb_id) {
    return Api().post(`facebook/login?_fbId=${fb_id}`);
  },
  logout(fb_id) {
    return Api().post(`facebook/login?_fbId=${fb_id}`);
  }
};
