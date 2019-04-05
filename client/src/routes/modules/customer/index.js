/** When your routing table is too long, you can split it into small modules**/

const generalRouter = {
  path: "/",
  component: require("@/views/customer/layouts").default,
  meta: {
    requiredAuth: true
  },
  children: [
    {
      path: "",
      component: require("@/views/customer/accountfacebook").default
    },
    {
      path: "/account",
      name: "c_account",
      component: require("@/views/customer/account").default
    },
    {
      path: "/f-message",
      name: "f_message",
      component: require("@/views/customer/messagefacebook").default
    },
    {
      path: "/f-account",
      name: "f_account",
      component: require("@/views/customer/accountfacebook").default
    },
    {
      path: "/f-timer",
      name: "f_timer",
      component: require("@/views/customer/timer").default
    },
    {
      path: "/f-script",
      name: "f_script",
      component: require("@/views/customer/scriptfacebook").default
    },
    {
      path: "/f-auto",
      name: "f_auto",
      component: require("@/views/customer/autofacebook").default
    },
    {
      path: "/f-friends",
      name: "f_friends",
      component: require("@/views/customer/friendfacebook").default
    },
    {
      path: "/f-libraries",
      name: "f_libraries",
      component: require("@/views/customer/libraryfacebook").default
    },
    {
      path: "/welcome",
      component: require("@/views/customer/welcome").default
    },
    {
      path: "/f-broadcast",
      component: require("@/views/customer/broadcast").default,
      children: [
        {
          path: "",
          name: "f_broadcast",
          component: require("@/views/customer/broadcast/components/main/default")
            .default
        },
        {
          path: "/now",
          name: "f_broadcast_now",
          component: require("@/views/customer/broadcast/components/main/now")
            .default
        },
        {
          path: "/schedule/:scheduleId",
          name: "f_broadcast_schedule",
          component: require("@/views/customer/broadcast/components/main/schedule")
            .default
        }
      ]
    }
  ]
};

export default generalRouter;
