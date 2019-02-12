import axios from "axios";
import UserService from "@/services/modules/account.service";
import CookieFunction from "@/utils/cookie.util";

const state = {
  status: "",
  token: CookieFunction.getCookie("sid") || "",
  user: {},
  statusNotification: ""
};

const getters = {
  isLoggedIn: state => !!state.token,
  authStatus: state => state.status,
  userInfo: state => state.user,
  statusNotification: state => state.statusNotification
};

const mutations = {
  auth_request: state => {
    state.status = "loading";
  },
  auth_success: (state, payload) => {
    state.status = "success";
    state.token = payload.token;
    state.user = payload.user;
  },
  user_get: (state, payload) => {
    state.user = payload;
  },
  user_action: (state, payload) => {
    state.statusNotification = payload;
  },
  logout: state => {
    state.status = "";
    state.token = "";
  }
};

const actions = {
  signIn: async ({ commit }, user) => {
    commit("auth_request");
    const resData = await UserService.signIn(user);
    // set cookie
    CookieFunction.setCookie("sid", resData.data.data.token, 1);
    CookieFunction.setCookie("uid", resData.data.data.user._id);
    // set Authorization
    axios.defaults.headers.common["Authorization"] = resData.data.data.token;
    const sendDataToMutation = {
      token: resData.data.data.token,
      user: resData.data.data.user
    };
    await commit("auth_success", sendDataToMutation);
  },
  signUp: async ({ commit }, user) => {
    commit("auth_request");
    const resData = await UserService.signUp(user);
    // set cookie
    CookieFunction.setCookie("sid", resData.data.data.token, 1);
    CookieFunction.setCookie("uid", resData.data.data._id);
    // set Authorization
    axios.defaults.headers.common["Authorization"] = resData.data.data.token;
    const sendDataToMutation = {
      token: resData.data.data.token,
      user: resData.data.data.user
    };
    commit("auth_success", sendDataToMutation);
  },
  logOut: async ({ commit }) => {
    commit("logout");
    // remove cookie
    CookieFunction.removeCookie("sid");
    CookieFunction.removeCookie("uid");
    // delete token on headers
    delete axios.defaults.headers.common["Authorization"];
  },
  getUserInfo: async ({commit}) => {
    const userInfoRes = await UserService.show(CookieFunction.getCookie("uid"));
    const sendDataToMutation = {
      token: CookieFunction.getCookie("sid"),
      user: userInfoRes.data.data[0]
    };
    commit("auth_success", sendDataToMutation);
  },
  updateUserInfo: async ({ commit }, user) => {
    const userDataRes = await UserService.update(
      user,
      CookieFunction.getCookie("uid")
    );
    await commit("user_get", userDataRes.data.data);
    await commit("user_action", "success");
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
