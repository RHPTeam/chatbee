/** When your routing table is too long, you can split it into small modules**/
const signinRouter = {
  path: "/reset-password",
  component: () => import("@/views/customer/resetpassword/index"),
  children: [
    {
      path: "",
      name: "step1",
      component: () => import("@/views/customer/resetpassword/components/step1")
    },
    {
      path: "step-2",
      name: "step2",
      component: () => import("@/views/customer/resetpassword/components/step2")
    },
    {
      path: "step-3",
      name: "step3",
      component: () => import("@/views/customer/resetpassword/components/step3")
    },
    {
      path: "finish-reset",
      name: "finish-reset",
      component: () =>
        import("@/views/customer/resetpassword/components/finish")
    }
  ]
};

export default signinRouter;
