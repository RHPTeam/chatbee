import Api from "@/services";

export default {
  index() {
    return Api().get("role");
  }
};
