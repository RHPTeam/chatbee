import Api from "@/services";

export default {
  index() {
    return Api().get("block");
  },
  show(id) {
    return Api().get(`block?_id=${id}`);
  },
  create(groupId) {
    return Api().post(`block?_groupId=${groupId}`);
  }
};
