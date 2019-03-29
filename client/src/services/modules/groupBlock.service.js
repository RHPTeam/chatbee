import Api from "@/services";

export default {
  index() {
    return Api().get("group-block");
  },
  create() {
    return Api().post("group-block");
  },
  deleteGroup(groupId) {
    return Api().delete(`group-block?_groupId=${groupId}`);
  },
  // Update name group block (Sky Albert)
  updateGroupBlock(groupBlockId, groupBlock) {
    return Api().patch(`group-block?_groupId=${groupBlockId}`, groupBlock);
  }
};
