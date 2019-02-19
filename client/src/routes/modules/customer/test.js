/** When your routing table is too long, you can split it into small modules**/
const testRouter = {
  path: "/test",
  component: () => import("@/views/customer/test")
};

export default testRouter;
