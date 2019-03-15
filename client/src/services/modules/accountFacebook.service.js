import Api from "@/services";

export default {
  create(cookie) {
    return Api().post("facebook",cookie);
  }
};
