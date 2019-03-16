export default {
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  }
};
