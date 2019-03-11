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
  users: [
    {
      _id: 1,
      name: "Đặng Yến",
      avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
    },
    {
      _id: 2,
      name: "Chinh Hồ",
      avatar:
        "http://123cunghoctin.com/uploads/freecontent/user-flat-icon-png-3.png"
    },
    {
      _id: 3,
      name: "Trần Toản",
      avatar:
        "http://thanhdatcomputer.vn/img_data/images/455356035511_avatar1.png"
    },
    {
      _id: 4,
      name: "Phan Đức",
      avatar: "https://image.flaticon.com/icons/png/512/272/272075.png"
    },
    {
      _id: 5,
      name: "Khang Lê",
      avatar:
        "https://dinhvixemay.org/wp-content/uploads/2018/10/avatar-372-456324.png"
    },
    {
      _id: 6,
      name: "Đinh Thảo",
      avatar: "http://www.psikologsec.com/images/resimsiz_k.png"
    },
    {
      _id: 7,
      name: "Lâm Nguyễn",
      avatar: "https://image.flaticon.com/icons/png/512/206/206881.png"
    },
    {
      _id: 8,
      name: "Phạm Học",
      avatar:
        "https://www.bestpersonnel.ie/wp-content/uploads/2017/11/Sani-Sebastian.png"
    },
    {
      _id: 9,
      name: "Quang Lê",
      avatar: "https://image.flaticon.com/icons/png/512/206/206897.png"
    },
    {
      _id: 10,
      name: "Đặng Yến",
      avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
    },
    {
      _id: 11,
      name: "Đặng Yến",
      avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
    },
    {
      _id: 12,
      name: "Đặng Yến",
      avatar: "http://www.igeacps.it/app/uploads/2018/05/profile_uni_user.png"
    }
  ],
  usersSelect: []
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
  usersSelect: state => state.usersSelect
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
    state.user = payload;
  },
  getUsersSelect: (state, payload) => {
    state.usersSelect = payload;
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
    const userInfoRes = await UserService.update(
      payload,
      CookieFunction.getCookie("uid")
    );
    commit("updateUser", userInfoRes.data.data);
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
  getUsers: async ({ commit }, payload) => {
    await commit("getUsers", payload);
  },
  getUsersSelect: async ({ commit }, payload) => {
    await commit("getUsersSelect", payload);
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
