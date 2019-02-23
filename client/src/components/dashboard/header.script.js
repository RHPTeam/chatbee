import IconBase from "@/components/icons/IconBase";
import IconMenu from "@/components/icons/IconMenu";
import IconArrowDown from "@/components/icons/IconArrowDown";
export default {
  components: {
    IconBase,
    IconMenu,
    IconArrowDown
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
