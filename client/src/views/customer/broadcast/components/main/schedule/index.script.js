import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";

import StringFunction from "@/utils/string.util";
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    schedules() {
      const dataArr = this.$store.getters.itemBroadcasts;
      return dataArr.filter(
        item =>
          StringFunction.convertUnicode(item.typeBroadCast)
            .toLowerCase()
            .trim() === "thiet lap bo hen"
      );
    }
  },
  async created() {
    await this.$store.dispatch(
      "getItemBroadcasts",
      this.$route.params.scheduleId
    );
  },
  components: {
    AppHeader,
    AppDesc,
    AppBody
  }
};
