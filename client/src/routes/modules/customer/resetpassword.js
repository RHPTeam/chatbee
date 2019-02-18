/** When your routing table is too long, you can split it into small modules**/
const signinRouter = {
  path: "/reset-password",
  component: () => import("@/views/customer/resetpassword/index")
};

export default signinRouter;
