import AppHeader from "./components/header";
import AppDesc from "./components/desc";
import AppBody from "./components/body";

import BroadcastService from "@/services/modules/broadcast.service";
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
    let result = await BroadcastService.index();
    result = result.data.data.filter(
      item =>
        StringFunction.convertUnicode(item.typeBroadCast)
          .toLowerCase()
          .trim() === "thiet lap bo hen"
    );
    const objSender = {
      broadId: result[0]._id,
      blockId: this.$route.params.scheduleId
    };
    this.$store.dispatch("getSchedule", objSender);
  },
  components: {
    AppHeader,
    AppDesc,
    AppBody
  }
};
