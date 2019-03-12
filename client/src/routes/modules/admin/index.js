/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/admin",
  component: require("@/views/admin/layouts").default,
  meta: {
    requiredAdmin: true
  },
  children: [
    {
      path: "admin_dashboard",
      name: "admin_dashboard",
      component: require("@/views/admin/dashboard").default
    },
    {
      path: "",
      name: "admin_users",
      component: require("@/views/admin/account").default
    }
  ]
};

export default generalRouter;
