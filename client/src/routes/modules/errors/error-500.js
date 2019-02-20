const errors500Routes = {
  path: "/500",
  component: () => import("@/views/500/index")
};

export default errors500Routes;
