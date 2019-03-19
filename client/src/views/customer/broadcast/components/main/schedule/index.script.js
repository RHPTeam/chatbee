import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";
import AppFooter from "./components/footer";

export default {
  data() {
    return {
      addText: false,
      addImages: false,
      listText: []
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  components: {
    AppHeader,
    AppDesc,
    AppBody,
    AppFooter
  }
};
