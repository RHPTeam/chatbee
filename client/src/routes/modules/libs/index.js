const libRoutes = {
  path: "/lib",
  component: () => import("@/views/libs/index"),
  children: [
    {
      path: "/drag",
      name: "drag",
      component: () => import("@/views/libs/draggable/index")
    }
  ]
};
export default libRoutes;
