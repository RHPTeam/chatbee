
export default {
  props: ["popupData"],
  data() {
    return {
      menus: [
        {
          text: "Bảng điều khiển",
          icon: {
            name: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard",
          IconComp: "IconHome"
        },
        {
          text: "Trò chuyện",
          icon: {
            name: "icon-chat",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_message",
          IconComp: "IconChat"
        },
        {
          text: "Trả lời tự động",
          icon: {
            name: "icon-auto-reply",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_auto",
          IconComp: "IconAutoReply"
        },
        {
          text: "Hẹn giờ gửi",
          icon: {
            name: "icon-timer",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_broadcast",
          IconComp: "IconTimer"
        },
        {
          text: "Kịch bản",
          icon: {
            name: "icon-script",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_script",
          IconComp: "IconScript"
        },
        {
          text: "Bạn bè",
          icon: {
            name: "icon-friend",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_friends",
          IconComp: "IconFriend"
        },
        {
          text: "Tài khoản Facebook",
          icon: {
            name: "icon-user",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_account",
          IconComp: "IconUser"
        },
        {
          text: "Thư viện",
          icon: {
            name: "icon-libs",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "f_libraries",
          IconComp: "IconLibs"
        }
      ],
      privateData: [
        {
          text: "Tùy chỉnh",
          icon: {
            name: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard",
          IconComp: "IconHome"
        },
        {
          text: "Riêng tư",
          icon: {
            name: "icon-user",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard",
          IconComp: "IconUser"
        }
      ]
    };
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  }
};
