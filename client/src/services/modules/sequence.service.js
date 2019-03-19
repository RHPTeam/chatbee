import Api from "@/services";

export default {
  index() {
    return Api().get("sequence");
  },
  create() {
    return Api().post("sequence");
  },
  createItemSequence(sequenceId) {
    return Api().post(`addBlock?_sequenceId=${sequenceId}`);
  },
  deteleSqc(sequenceId) {
    return Api().delete(`sequence?_sequenceId=${sequenceId}`);
  }
};
