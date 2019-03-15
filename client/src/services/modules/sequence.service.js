import Api from "@/services";

export default {
  index() {
    return Api().get("sequence");
  },
  show(id) {
    return Api().get(`sequence?_id=${id}`);
  },
  create() {
    return Api().post("sequence");
  },
  update(sequence, sqcId) {
    return Api().patch(`sequence?_squenceId=${sqcId}`, sequence);
  }
};
