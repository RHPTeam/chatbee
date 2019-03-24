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
  updateItemSqc(sequencId, itemId, item) {
    return Api.patch(`sequence?_sequenceId=${sequencId}&_itemId=${itemId}`, item);
  },
  deteleSqc(sequenceId) {
    return Api().delete(`sequence?_sequenceId=${sequenceId}`);
  }
};
