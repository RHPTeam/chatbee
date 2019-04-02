import Api from "@/services";

export default {
  index() {
    return Api().get("attr");
  },
  show(attrId) {
    return Api().get(`attr?_attrId=${attrId}`);
  },
  create() {
    return Api().post("attr");
  },
  update(attrId, attr) {
    return Api().patch(`attr?_attrId=${attrId}`, attr);
  },
  delete(attrId) {
    return Api.delete(`attr?_attrId=${attrId}`);
  }
};
