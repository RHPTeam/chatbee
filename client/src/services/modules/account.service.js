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
  update(user) {
    return Api().patch(`users`, user);
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
  changePassword(user) {
    return Api().patch(`users/change-password`, user);
  },
  resetPassword(email) {
    return Api().post(`password/reset-password`, email);
  },
  checkCode(data) {
    return Api().post(`password/check-code`, data);
  },
  createNewPassword(user, userId) {
    return Api().patch(`users/new-password?_userId=${userId}`, user);
  },
  upload(file) {
    return Api().post(`users`, file);
  }
};
