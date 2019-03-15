import Api from "@/services";

export default {
  index() {
    return Api().get("group-block");
  },
  create() {
    return Api().post("group-block");
  }
};
