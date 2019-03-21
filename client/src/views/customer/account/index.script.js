import AppBreadCrumb from "@/components/breadcrumb";
import ModalChangePassword from "./components/popup_change_password";
import ModalChangeInfo from "./components/popup_change_info";

export default {
  data() {
    return {
      newPassword: "",
      reNewPassword: "",
      oldPassword: "",
      isCompare: false,
      imageLight: require("@/assets/images/theme-light-setting.png"),
      imageDark: require("@/assets/images/theme-dark-setting.png"),
      isChangeImage: false,
      showModal: false,
      showPopupChangeInfo: false,
      showModalChangePassword: false,
      typeDeletePopup: 0,
      showCustomTheme: false,
      isSwitchSuggest: false,
      isSwitchTutorial: false,
      isSwitchTheme: false
      /*Custom time about theme gắn giá trị currenTheme bằng 24h.
      alwaysShowLight: true,
      showCustomLight: false,
      showCustomThemeLight: {
        timeStart: "",
        timeOut: ""
      },
      alwaysShowDark: false,
      showCustomThemeDark: {
        timeStart: "",
        timeOut: ""
      }*/
    };
  },
  computed: {
    user() {
      if (this.$store.getters.userInfo === undefined) return;
      this.$store.getters.userInfo.settings.system.suggest === 0
        ? (this.isSwitchSuggest = false)
        : (this.isSwitchSuggest = true);
      this.$store.getters.userInfo.settings.system.tutorial === 0
        ? (this.isSwitchTutorial = false)
        : (this.isSwitchTutorial = true);
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  filters: {
    getFirstLetter(string) {
      if (typeof string == "undefined") return;
      if (string.length === 0) return;
      return string.charAt(0).toUpperCase();
    },
    formatDate(d) {
      const newDate = new Date(d);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const date = newDate.getDate();
      let minutes = newDate.getMinutes();
      if (minutes < 10) minutes = "0" + minutes;
      return `${date}/${month}/${year}`;
    }
  },
  methods: {
    changeAvatar(e) {
      const file = e.target.files[0];
      this.user.imageAvatar = URL.createObjectURL(file);

      this.$store.dispatch("updateUser", this.user);
    },
    closeChangeImage() {
      this.isChangeImage = false;
    },
    deleteImage(type) {
      this.showModal = !this.showModal;
      this.typeDeletePopup = type;
    },
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    async updateUser() {
      this.isComparePassword();
      if (this.isCompare) {
        const passwordSender = {
          password: this.oldPassword,
          newPassword: this.newPassword
        };
        this.$store.dispatch("changePassword", passwordSender);
      }
      this.$store.dispatch("updateUser", this.user);
    },
    isComparePassword() {
      if (this.newPassword === "" || this.reNewPassword === "")
        return (this.isCompare = false);
      if (this.newPassword !== this.reNewPassword)
        return (this.isCompare = false);
      return (this.isCompare = true);
    },
    switchSuggest() {
      this.isSwitchSuggest = !this.isSwitchSuggest;
      if (this.isSwitchSuggest === true) {
        this.user.settings.system.suggest = 1;
      } else {
        this.user.settings.system.suggest = 0;
      }
      this.$store.dispatch("updateUser", this.user);
    },
    switchTutorial() {
      this.isSwitchTutorial = !this.isSwitchTutorial;
      if (this.isSwitchTutorial === true) {
        this.user.settings.system.tutorial = 1;
      } else {
        this.user.settings.system.tutorial = 0;
      }
      this.$store.dispatch("updateUser", this.user);
    }
    /*switchTheme() {
      this.isSwitchTheme = !this.isSwitchTheme;
      if (this.isSwitchTheme === true) {
        this.user.settings.themeCustom.typeTheme = "auto";
      } else {
        this.user.settings.themeCustom.typeTheme = "custom";
      }
      this.$store.dispatch("updateUser", this.user);
    },
    setupAlwaysThemeLight() {
      this.alwaysShowLight = !this.alwaysShowLight;
      this.user.settings.themeCustom.valueTheme = "light";
      this.$store.dispatch("updateUser", this.user);
    },
    setupCustomThemeLight() {
      this.showCustomLight = !this.showCustomLight;
      this.user.settings.themeCustom.valueTheme = `${
        this.showCustomThemeLight.timeStart
      } - ${this.showCustomThemeLight.timeOut}`;
      this.$store.dispatch("updateUser", this.user);
    },
    setupAlwaysThemeDark() {
      this.alwaysShowDark = !this.alwaysShowDark;
      this.user.settings.themeCustom.valueTheme = "dark";
      this.$store.dispatch("updateUser", this.user);
    },
    setupCustomThemeDark() {
      this.showCustomDark = !this.showCustomDark;
      this.user.settings.themeCustom.valueTheme = `${
        this.showCustomThemeDark.timeStart
      } - ${this.showCustomThemeDark.timeOut}`;
      this.$store.dispatch("updateUser", this.user);
    }*/
  },
  components: {
    AppBreadCrumb,
    ModalChangePassword,
    ModalChangeInfo
  },
  watch: {
    "user.name"() {
      this.showPopupChangeInfo = true;
    },
    "user.phone"() {
      this.showPopupChangeInfo = true;
    },
    newPassword() {
      this.showPopupChangeInfo = true;
    },
    reNewPassword() {
      this.showPopupChangeInfo = true;
    }
  }
};
