import IconBase from "@/components/icons/IconBase";
import IconChat from "@/components/icons/IconChat";
import IconTimer from "@/components/icons/IconTimer";
import IconAutoReply from "@/components/icons/IconAutoReply";
import IconHome from "@/components/icons/IconHome";
import IconFriend from "@/components/icons/IconFriend";
import IconLibs from "@/components/icons/IconLibs";
import IconUser from "@/components/icons/IconUser";
import IconScript from "@/components/icons/IconScript";
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
          to: "c_dashboard",
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
  },
  components: {
    IconBase,
    IconChat,
    IconAutoReply,
    IconFriend,
    IconHome,
    IconLibs,
    IconUser,
    IconTimer,
    IconScript
  }
};
