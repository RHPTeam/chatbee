import Api from "@/services";

export default {
  index() {
    return Api().get("attr");
  },
  show(attrId) {
    return Api().get(`attr?_id=${attrId}`);
  },
  create() {
    return Api().post("attr");
  },
  update(attrId, attr) {
    return Api().patch(`attr?_attrId=${attrId}`, attr);
  },
  deleteAttribute(attrId) {
    return Api().delete(`attr?_attrId=${attrId}`);
  }
};
