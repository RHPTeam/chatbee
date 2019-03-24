import Api from "@/services";

export default {
  index() {
    return Api().get("vocate");
  },
  
  create(data) {
    return Api().post("vocate", data);
  }
};
