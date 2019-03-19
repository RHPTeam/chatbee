import Api from "@/services";

export default {
  index() {
    return Api().get("syntax");
  },
  create() {
    return Api().post("syntax");
  },
  show(syntaxId) {
    return Api().get(`syntax?_id=${syntaxId}`);
  },
  update(syntaxId, syntax) {
    return Api().patch(`syntax?_id=${syntaxId}`, syntax);
  },
  delete(syntaxId) {
    return Api().delete(`syntax?_id=${syntaxId}`);
  }
};
