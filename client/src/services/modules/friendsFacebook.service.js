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
  updateGroup(data) {
    const gr_id = data.gr_id;
    const dataSender = {
      name: data.name
    };
    return Api().patch(`group-friend?_groupId=${gr_id}`, dataSender);
  },
  createGroupByName(name) {
    const dataSender = {
      name: name
    };
    return Api().post("group-friend?_name=true", dataSender);
  },
  addFriendsToGroup(data) {
    const gr_id = data.gr_id;
    const dataSender = {
      friendId: data.friends
    };
    return Api().post(`group-friend/addFriend?_groupId=${gr_id}`, dataSender);
  },
  deleteFriendsFromGroup(data) {
    const gr_id = data.gr_id;
    const dataSender = {
      friendId: data.friends
    };
    return Api().put(`group-friend?_groupId=${gr_id}&_friend=true`, dataSender);
  },
  deleteGroup(gr_id) {
    return Api().put(`group-friend?_groupId=${gr_id}`);
  }
};
