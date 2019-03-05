import IconBase from "@/components/icons/IconBase";
import IconChat from "@/components/icons/IconChat";
import IconTimer from "@/components/icons/IconTimer";
import IconAutoReply from "@/components/icons/IconAutoReply";
import IconHome from "@/components/icons/IconHome";
import IconFriend from "@/components/icons/IconFriend";
import IconLibs from "@/components/icons/IconLibs";
import IconUser from "@/components/icons/IconUser";
import IconScript from "@/components/icons/IconScript";
import IconSvg from "../../shared/iconsvg_library";
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
          to: "c_dashboard"
        },
        {
          text: "Trò chuyện",
          icon: {
            name: "icon-chat",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Trả lời tự động",
          icon: {
            name: "icon-auto-reply",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Hẹn giờ gửi",
          icon: {
            name: "icon-timer",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Kịch bản",
          icon: {
            name: "icon-script",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Bạn bè",
          icon: {
            name: "icon-friend",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Tài khoản Facebook",
          icon: {
            name: "icon-user",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
        },
        {
          text: "Thư viện",
          icon: {
            name: "icon-libs",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_dashboard"
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
          to: "c_dashboard"
        },
        {
          text: "Thiết lập tài khoản",
          icon: {
            name: "icon-user",
            width: 20,
            height: 20,
            viewBox: "0 0 25 25"
          },
          to: "c_account"
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
    IconScript,
    IconSvg
  }
};
