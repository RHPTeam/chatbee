import Api from "@/services";

export default {
  index() {
    return Api().get("sequence");
  },
  show(SqcId) {
    return Api().get(`sequence?_SqcId=${SqcId}`);
  },
  create() {
    return Api().post("sequence");
  },
  createItemSequence(sequenceId) {
    return Api().post(`sequence/addBlock?_sqId=${sequenceId}`);
  },
  update(sequenceId, sequence) {
    return Api().patch(`sequence?_sqId=${sequenceId}`, sequence);
  },
  updateItemSqc(sequenceId, itemId, item) {
    return Api().patch(`sequence?_sqId=${sequenceId}&_blockId=${itemId}`, item);
  },
  deleteSequence(sequenceId) {
    return Api().delete(`sequence?_sqId=${sequenceId}`);
  }
};
