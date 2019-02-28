import IconBase from "@/components/icons/IconBase";
import IconLogoShort from "@/components/icons/IconLogoShort";
import IconLogoText from "@/components/icons/IconLogoText";
import IconHome from "@/components/icons/IconHome";
import IconChat from "@/components/icons/IconChat";
import IconAutoAnswer from "@/components/icons/IconAutoAnswer";
import IconTimer from "@/components/icons/IconTimer";
import IconScript from "@/components/icons/IconScript";
import IconFriend from "@/components/icons/IconFriend";
import IconAccount from "@/components/icons/IconAccount";
import IconLibs from "@/components/icons/IconLibs";
export default {
  components: {
    IconBase,
    IconLogoShort,
    IconLogoText,
    IconHome,
    IconChat,
    IconAutoAnswer,
    IconTimer,
    IconScript,
    IconFriend,
    IconAccount,
    IconLibs
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  }
};
