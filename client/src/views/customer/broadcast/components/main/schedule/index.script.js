import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";

export default {
  data() {
    return {
      
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
    AppBody
  }
};
