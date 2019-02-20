/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/",
  component: () => import("@/views/customer/layouts"),
  meta: {
    requiredAuth: true
  },
  children: [
    {
      path: "",
      name: "c_dashboard",
      component: () => import("@/views/customer/dashboard")
    },
    {
      path: "/account",
      name: "c_account",
      component: () => import("@/views/customer/account")
    },
    {
      path: "/m-account",
      name: "m_account",
      component: () => import("@/views/customer/facebookaccount")
    },
    {
      path: "/f-message",
      name: "f_message",
      component: () => import("@/views/customer/messagefacebook")
    },
    {
      path: "/f-account",
      name: "f_account",
      component: () => import("@/views/customer/accountfacebook")
    }
  ]
};

export default generalRouter;
