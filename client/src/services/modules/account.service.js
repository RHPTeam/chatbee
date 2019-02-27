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
  showUserByEmail(email) {
    return Api().get(`users?email=${email}`);
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
  },
  resetPassword(email) {
    return Api().post(`users/reset-password`, email);
  },
  checkCode(data) {
    return Api().post(`users/check-code`, data);
  },
  createNewPassword(user, userId) {
    return Api().patch(`users/new-password?_userId=${userId}`, user);
  }
};
