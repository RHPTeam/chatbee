/** When your routing table is too long, you can split it into small modules**/
const signinRouter = {
  path: "/signin",
  component: () => import("@/views/customer/signin")
};

export default signinRouter;
