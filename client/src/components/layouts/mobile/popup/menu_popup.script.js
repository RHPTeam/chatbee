export default {
  props: ["popupData"],
  data() {
    return {
      menus: [
        {
          text: "Tài khoản cá nhân",
          icon: {
            iconName: "home",
            tagName: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "c_account"
        },
        {
          text: "Kịch bản",
          icon: {
            iconName: "script",
            tagName: "icon-script",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "f_script"
        },
        {
          text: "Trò chuyện",
          icon: {
            iconName: "chat",
            tagName: "icon-chat",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "f_message"
        },
        {
          text: "Trả lời tự động",
          icon: {
            iconName: "auto-answer",
            tagName: "icon-auto-answer",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "f_auto"
        },
        {
          text: "Bạn bè",
          icon: {
            iconName: "friend",
            tagName: "icon-friend",
            width: 22,
            height: 22,
            viewBox: "0 0 24 24"
          },
          to: "f_friends"
        },
        {
          text: "Chiến dịch",
          icon: {
            iconName: "broadcast",
            tagName: "icon-broadcast",
            width: 21,
            height: 21,
            viewBox: "0 0 24 24"
          },
          to: "f_broadcast"
        },

        {
          text: "Tài khoản Facebook",
          icon: {
            iconName: "account",
            tagName: "icon-account",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "f_account"
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length == 0) return;
      return string.charAt(0).toUpperCase();
    }
  }
};
