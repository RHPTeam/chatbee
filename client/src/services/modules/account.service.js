import Api from "@/services";

export default {
  index() {
    return Api().get("users");
  },
  create(user) {
    return Api().post("users", user);
  },
  show(userId) {
    return Api().get(`users?_id=${userId}`);
  },
  update(user, userId) {
    return Api().patch(`users?_userId=${userId}`, user);
  },
  delete(userId) {
    return Api().delete(`users/${userId}`);
  },
  signUp(user) {
    return Api().post("signup", user);
  },
  signIn(user) {
    return Api().post("signin", user);
  },
  changePassword(user, userId) {
    return Api().patch(`users/change-password?_userId=${userId}`, user);
  }
};
