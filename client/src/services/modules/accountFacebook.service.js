import Api from "@/services";

export default {
  create(cookie, loginType, userId) {
    return Api().post(
      `facebook-account?_type=${loginType}&_user=${userId}`,
      cookie
    );
  }
};
