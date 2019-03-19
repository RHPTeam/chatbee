import Api from "@/services";

export default {
  index() {
    return Api().get("sequence");
  },
  create() {
    return Api().post("sequence");
  },
  deteleSqc(sequenceId) {
    return Api().delete(`sequence?_sequenceId=${sequenceId}`);
  }
};
