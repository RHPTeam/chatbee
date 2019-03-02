import IconBase from "@/components/icons/IconBase";
import IconMenu from "@/components/icons/IconMenu";
import IconArrowDown from "@/components/icons/IconArrowDown";
import IconFriend from "@/components/icons/IconFriend";
import IconAccount from "@/components/icons/IconAccount";
import IconLibs from "@/components/icons/IconLibs";
import IconLogout from "@/components/icons/IconLogout";
export default {
  components: {
    IconBase,
    IconMenu,
    IconArrowDown,
    IconAccount,
    IconLibs,
    IconFriend,
    IconLogout
  },
  computed: {
    user() {
      return this.$store.getters.userInfo;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      this.statusCollapse = this.$store.getters.collapseMenu;
    }
  },
  data() {
    return {
      statusCollapse: false,
      showdropdown: false
    };
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("logOut");
      this.$router.push("/signin");
    },
    toogleSidebar() {
      this.statusCollapse = !this.statusCollapse;
      this.$store.dispatch("changeMenu", this.statusCollapse);
    },
    showDropdown: function() {
      this.showdropdown = !this.showdropdown;
    }
  }
};
