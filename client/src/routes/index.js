import Vue from "vue";
import Router from "vue-router";

import customer_generalRouter from "./modules/customer";
import customer_signinRouter from "./modules/customer/signin";
import customer_signupRouter from "./modules/customer/signup";
import customer_testRouter from "./modules/customer/test";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    customer_generalRouter,
    customer_signinRouter,
    customer_signupRouter,
    customer_testRouter
  ]
});