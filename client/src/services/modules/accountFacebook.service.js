import Api from "@/services";

export default {
  index() {
    return Api().get("facebook");
  },
  
  create(cookie) {
    return Api().post("facebook",cookie);
  }
};
