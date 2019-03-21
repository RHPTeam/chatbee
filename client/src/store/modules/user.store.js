import axios from "axios";
import UserService from "@/services/modules/account.service";
import CookieFunction from "@/utils/cookie.util";

const state = {
  status: "",
  token: CookieFunction.getCookie("sid") || "",
  user: {},
  statusNotification: "",
  mailSender: "",
  statusResetPassword: false,
  textAuth: "",
  users: [],
  usersFilter: [],
  fileAvatar: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  userInfo: state => state.user,
  statusNotification: state => state.statusNotification,
  mailSender: state => state.mailSender,
  statusResetPassword: state => state.statusResetPassword,
  textAuth: state => state.textAuth,
  users: state => state.users,
  usersFilter: state => state.usersFilter,
  fileAvatar: state => state.fileAvatar
};

const mutations = {
  auth_request: state => {
    state.status = "loading";
  },
  auth_request_success: state => {
    state.status = "success";
  },
  auth_success: (state, payload) => {
    state.status = "success";
    state.token = payload.token;
    state.user = payload.user;
  },
  auth_error: state => {
    state.status = "error";
  },
  user_set: (state, payload) => {
    state.user = payload;
  },
  user_action: (state, payload) => {
    state.statusNotification = payload;
  },
  logout: state => {
    state.status = "";
    state.token = "";
  },
  updateUser: (state, payload) => {
    state.user = payload;
  },
  mailSender: (state, payload) => {
    state.mailSender = payload;
  },
  statusResetPassword_set: (state, payload) => {
    state.statusResetPassword = payload;
  },
  set_textAuth: (state, payload) => {
    state.textAuth = payload;
  },
  getUsers: (state, payload) => {
    state.users = payload;
  },
  getUsersFilter: (state, payload) => {
    state.usersFilter = payload;
  },
  setFileAvatar: (state, payload) => {
    state.fileAvatar = payload;
  }
};

const actions = {
  signIn: async ({ commit }, user) => {
    try {
      commit("auth_request");
      const resData = await UserService.signIn(user);
      CookieFunction.setCookie("sid", resData.data.data.token, 1);
      CookieFunction.setCookie("uid", resData.data.data.user._id);
      CookieFunction.setCookie("cfr", resData.data.data.role);
      axios.defaults.headers.common["Authorization"] = resData.data.data.token;
      const sendDataToMutation = {
        token: resData.data.data.token,
        user: resData.data.data.user
      };
      commit("auth_success", sendDataToMutation);
    } catch (e) {
      if (e.response.status === 401) commit("auth_error");
    }
  },
  signUp: async ({ commit }, user) => {
    try {
      commit("auth_request");
      const resData = await UserService.signUp(user);
      // set cookie
      CookieFunction.setCookie("sid", resData.data.data.token, 1);
      CookieFunction.setCookie("uid", resData.data.data._id);
      CookieFunction.setCookie("cfr", resData.data.data.role);
      // set Authorization
      axios.defaults.headers.common["Authorization"] = resData.data.data.token;
      const sendDataToMutation = {
        token: resData.data.data.token,
        user: resData.data.data.user
      };
      commit("auth_success", sendDataToMutation);
    } catch (e) {
      commit("auth_error");
      if (e.response.status === 405) {
        commit("set_textAuth", e.response.data.data.details[0].context.label);
      } else {
        commit("set_textAuth", e.response.data.status);
      }
      return false;
    }
  },
  logOut: async ({ commit }) => {
    commit("logout");
    // remove cookie
    CookieFunction.removeCookie("sid");
    CookieFunction.removeCookie("uid");
    // delete token on headers
    delete axios.defaults.headers.common["Authorization"];
  },
  getUserInfo: async ({ commit }) => {
    commit("auth_request");
    const userInfoRes = await UserService.show(CookieFunction.getCookie("uid"));
    const sendDataToMutation = {
      token: CookieFunction.getCookie("sid"),
      user: userInfoRes.data.data[0]
    };
    commit("auth_success", sendDataToMutation);
  },
  updateUser: async ({ commit }, payload) => {
    await UserService.update(payload);
    const userInfoRes = await UserService.show(CookieFunction.getCookie("uid"));
    commit("updateUser", userInfoRes.data.data[0]);
  },
  changePassword: async ({ commit }, payload) => {
    commit("auth_request");
    await UserService.changePassword(payload, CookieFunction.getCookie("uid"));
    commit("auth_request_success");
  },
  resetPassword: async ({ commit }, payload) => {
    commit("auth_request");
    const sendEmail = {
      email: payload
    };
    await UserService.resetPassword(sendEmail);
    const userData = await UserService.showUserByEmail(payload);
    commit("user_set", userData.data.data[0]);
    commit("mailSender", payload);
    commit("auth_request_success");
  },
  checkCode: async ({ commit, state }, payload) => {
    commit("auth_request");
    const data = {
      code: payload,
      email: state.mailSender
    };
    console.log(data.email);
    await UserService.checkCode(data);
    commit("auth_request_success");
  },
  newPassword: async ({ commit, state }, payload) => {
    commit("auth_request");
    const objSender = {
      newPassword: payload
    };
    await UserService.createNewPassword(objSender, state.user._id);
    commit("statusResetPassword_set", true);
    commit("auth_request_success");
  },
  set_error: async ({ commit }, payload) => {
    commit("set_textAuth", payload);
    commit("auth_error");
  },
  getUsers: async ({ commit }) => {
    const users = await UserService.index();
    await commit("getUsers", users.data.data);
  },
  getUsersFilter: async ({ commit }, payload) => {
    await commit("getUsersFilter", payload);
  },
  sendFile: async ({ commit }, payload) => {
    commit("setFileAvatar", payload);
    await UserService.upload({ imageAvatar: payload });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
