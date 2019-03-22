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
  },
  getFriendByID(fr_id) {
    return Api().get(`friend?_id=${fr_id}`);
  },

  // *****GROUP FRIEND*****//
  getGroupFriend() {
    return Api().get("group-friend");
  },
  getGroupByID(gr_id) {
    return Api().get(`group-friend?_id=${gr_id}`);
  },
  createGroup() {
    return Api().post("group-friend");
  },
  deleteFriendsFromGroup(gr_id, friends) {
    return Api().delete(`group-friend?_groupId=${gr_id}&_friend=1`, friends);
  }
};
