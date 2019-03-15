import Api from "@/services";

export default {
  index() {
    return Api().get("friend");
  },
  create(fb_id) {
    return Api().post(`facebook/friend?FB_ID=${fb_id}`);
  },
  getFriendsUser(fb_id) {
    return Api().get(`friend?_facebook=${fb_id}`);
  }
};
