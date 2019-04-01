import Vue from "vue";
import Router from "vue-router";

import admin_generalRouter from "./modules/admin";
import customer_generalRouter from "./modules/customer";
import customer_signinRouter from "./modules/customer/signin";
import customer_signupRouter from "./modules/customer/signup";
import customer_testRouter from "./modules/customer/test";
import errors404Routes from "./modules/errors/error-404";
import errors500Routes from "./modules/errors/error-500";
import customer_resetPassword from "./modules/customer/resetpassword";

Vue.use(Router);

export default new Router({
  // mode: "history",
  base: process.env.BASE_URL,
  routes: [
    admin_generalRouter,
    customer_generalRouter,
    customer_signinRouter,
    customer_signupRouter,
    customer_testRouter,
    errors404Routes,
    errors500Routes,
    customer_resetPassword,
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
