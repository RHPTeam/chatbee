/** When your routing table is too long, you can split it into small modules**/
const signupRouter = {
  path: "/signup",
  component: () => import("@/views/customer/signup")
};

export default signupRouter;
