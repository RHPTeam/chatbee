import Api from "@/services";

export default {
  create(cookie, loginType) {
    return Api().post(`facebook-account?_type=${loginType}`, cookie);
  }
};
